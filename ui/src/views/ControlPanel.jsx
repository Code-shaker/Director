// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

// Components
import Logo from '../components/Logo.jsx'
import Clock from '../components/Clock.jsx'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

// Subviews
import Status from './Status.jsx'
import Actions from './Actions.jsx'
import Variables from './Variables.jsx'
import Automation from './Automation.jsx'
import Devices from './Devices.jsx'
import Configuration from './Configuration.jsx'

class ControlPanel extends Component {
  constructor (props) {
    super(props)
    this.state = { tabIndex: 0 }

    // Styles for tab buttons
    this.styleTabInactive = 'block px-4 py-1 md:p-2 lg:px-4'
    this.styleTabActive = 'block px-4 py-1 md:p-2 lg:px-4 text-black bg-teal-200 rounded-full'
  }

  render (state) {
    return (
      <div className="h-screen overflow-hidden">
        {/* <Navbar /> */}
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <nav className="bg-teal-300 shadow" role="navigation">
            <div className="p-4 flex flex-wrap items-center md:flex-no-wrap">
              <div className="mr-4 md:invisible lg:visible">
                <a href="https://github.com/boreal-systems/Director" rel="home">
                  <Logo className="text-3xl"/>
                </a>
              </div>
              <div className="ml-auto md:hidden">
                <button className="flex items-center px-3 py-2 border rounded" type="button">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                  </svg>
                </button>
              </div>
              <div className="w-full md:w-auto md:flex-grow md:flex md:items-center">
                <TabList className="flex flex-col mt-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
                  <Tab selectedClassName={this.styleTabActive} className={this.styleTabInactive}>
                    <a href="#">Status</a>
                  </Tab>
                  <Tab selectedClassName={this.styleTabActive} className={this.styleTabInactive}>
                    <a href="#">Actions</a>
                  </Tab>
                  <Tab selectedClassName={this.styleTabActive} className={this.styleTabInactive}>
                    <a href="#">Variables</a>
                  </Tab>
                  <Tab selectedClassName={this.styleTabActive} className={this.styleTabInactive}>
                    <a href="#">Automation</a>
                  </Tab>
                  <Tab selectedClassName={this.styleTabActive} className={this.styleTabInactive}>
                    <a href="#">Devices</a>
                  </Tab>
                  <Tab selectedClassName={this.styleTabActive} className={this.styleTabInactive}>
                    <a href="#">Configuration</a>
                  </Tab>
                  <li>
                    <a href="#">Logout</a>
                  </li>
                  <li className="sm:invisible xl:visible">
                    <Clock className={this.styleTabInactive} />
                  </li>
                </TabList>
              </div>
            </div>
          </nav>
          <div className="container mx-auto px-4 h-full">
            <TabPanel>
              <Status />
            </TabPanel>
            <TabPanel>
              <Actions />
            </TabPanel>
            <TabPanel>
              <Variables />
            </TabPanel>
            <TabPanel>
              <Automation />
            </TabPanel>
            <TabPanel>
              <Devices />
            </TabPanel>
            <TabPanel>
              <Configuration />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    )
  }
}

export default hot(module)(ControlPanel)