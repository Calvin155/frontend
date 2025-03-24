Author: Calvin Lynch - K00271788
Project - Air Quality Metrics Using A Raspberry Pi 5
Front End Application - React:

Purpose: View Envormental Metrics such as Co2 & PM.

Uses Rest-Api's for fetching data & displaying.

Important: Make sure to update the IP addess in the URLS to match your exisiting setup of your FastApi RestServer setup & where is deployed. Line 15 in AQIData.js - Located in /src/pages

Requirements: nmp(Node Package manager)
Dependencies are managed using NPM.

FastApi Rest Server & Influx Database - Deployed Publically & running correctly - Refer to readme/docs in the source code of those repositorys.

To Run web application
Step 1, Navigate to the root of the project /FRONTEND
Step 2, Type "npm start" - This will start the server & the web applciation will be available on port 3000 of the machine it is running.

If this fails to run, type "npm install" in the project root & again type "npm start" which shold fix it.

This application fetches data from Rest-Api's which are gotten from a FastApi Rest Server I have created & is deployed in the cloud along  with the data base.

The aim of this application is to be able to view live data from a Rest Server deployed in the cloud which receives data from a time series database in the cloud which receives its data every 15 seconds from a Raspberry Pi that has enviromental sensors attached.

The applciation provideds live data at the top of the page which updates every minute, live data over time & recommendations.

Data: Co2 & Particulate Matter
