import React from 'react'
import { Container, Loader, Menu, Form, Modal, Header, Button, Icon, List, Segment, Popup } from 'semantic-ui-react'

class Main extends React.Component {
  state = {
    loading: true,
    supportCenterOpen: false,
    activeItem: 'faq'
  }
  
  messageRef = React.createRef()
  fetchMe = () => {
    fetch('/me', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        loading: false
      })
    })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  componentDidMount() {
    this.fetchMe()
    App.shopChannel = App.cable.subscriptions.create('ShopChannel', {
      received: (data) => {
      }
    })
  }

  loaderContent = () => {

    return (
      <div>
        <p>{`Loading`}</p>
      </div>
    )
  }

  renderSupportCenter = () => {
    const { activeItem } = this.state

    if (activeItem === 'faq') {
      return (
        <List relaxed='very'>
          <List.Item>
            <List.Header>Question?</List.Header>
            Answer.
          </List.Item>
        </List>
      )
    } else if (activeItem === 'privacy policy') {
      return (
        <div>
          <p>"the App” provides order analytics aka "the Service" to merchants who use Shopify to power their stores. This Privacy Policy describes how personal information is collected, used, and shared when you install or use the App in connection with your Shopify-supported store.</p>
          <h3>Personal Information the App Collects</h3>
          <p>When you install the App, we are automatically able to access certain types of information from your Shopify account: we have the ability to read the last 60 days' worth of order information from your store. We never store identifying information about your customers, or specific order information; rather, we aggregate and store daily order information to provide generalized analytics and insights from your orders.</p>
          <p>We collect personal information directly from the relevant individual, through your Shopify account, or using the following technologies: “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org. “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>
          <h3>How Do We Use Your Personal Information?</h3>
          <p>We use the personal information we collect from you and your customers in order to provide the Service and to operate the App. Additionally, we use this personal information to: Communicate with you; Optimize or improve the App; and Provide you with information or advertising relating to our products or services.</p>
          <h3>Sharing your personal information</h3>
          <p>We will never share your personal information with a third-party, except to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
          <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
          <p>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you add a new product to your site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>
          <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
          <h3>Contact Us</h3>
          <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at bergquist.kenneth@gmail.com or via the Contact Us option.</p>
        </div>
      )
    } else if (activeItem === 'contact us') {
      return this.renderContactUsForm()
    }
  }

  renderContactUsForm = () => {
    return (
      <Form>
        <Form.Field>
          <textarea ref={this.messageRef} placeholder='Enter your message' />
        </Form.Field>
        <Popup
          trigger={<Form.Button onClick={this.handleMessageSubmit}>Submit</Form.Button>}
          content='Message received, expect a response within 24 hours.'
          on='click' />
      </Form>
    )
  }

  handleMessageSubmit = () => {
    const message = this.messageRef.current.value
    this.messageRef.current.value = ''
    fetch(`/support`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': this.props.authToken
      },
      body: JSON.stringify({ message })
    })
  }

  render() {
    const { activeItem } = this.state
    
    return (
      <React.Fragment>
        <Menu>
          <Menu.Item header>Starter3</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item link content='Support center' onClick={()=> this.setState({supportCenterOpen: true})}/>
          </Menu.Menu>
        </Menu>
        <Modal size='small' open={this.state.supportCenterOpen}>
          <Header content='Support Center' />
          <Modal.Content>
            <div>
              <Menu attached='top' tabular>
                <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick} />
                <Menu.Item
                  name='contact us'
                  active={activeItem === 'contact us'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='privacy policy'
                  active={activeItem === 'privacy policy'}
                  onClick={this.handleItemClick}
                />
              </Menu>
              <Segment attached='bottom'>
                {this.renderSupportCenter()}
              </Segment>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' onClick={() => this.setState({supportCenterOpen: false})}>
              <Icon name='remove' /> Close
            </Button>
          </Modal.Actions>
        </Modal>
        <Container>
          <Loader active={this.state.loading}/>
        </Container>
      </React.Fragment>
    )
  }
}

export default Main
