
# ActiveMotion-Orthanc

This repository provides a guide to deploying a PACS DICOM system using Orthanc as the server, OHIF as the DICOM viewer, and Keycloak for access management. With this setup, you can securely manage, store, and view medical images, enabling scalable and interoperable solutions for healthcare and research environments.

## Table of Contents
- [Introduction](#introduction)
- [Architecture Overview](#architecture-overview)
- [Deployment Guide](#deployment-guide)
  - [Step 1: Orthanc Setup](#step-1-orthanc-setup)
  - [Step 2: OHIF Viewer Setup](#step-2-ohif-viewer-setup)
  - [Step 3: Keycloak Setup](#step-3-keycloak-setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project aims to provide a complete solution for deploying your own DICOM system for medical imaging management. Whether you're setting up a PACS for research, clinical use, or educational purposes, this guide offers detailed instructions for deploying three major components:

- **Orthanc**: Lightweight, open-source DICOM server to manage medical imaging data.
- **OHIF Viewer**: Web-based DICOM viewer that integrates seamlessly with Orthanc.
- **Keycloak**: Identity and access management system to secure your infrastructure.

## Architecture Overview

The system consists of three primary components:

1. **Orthanc**: Acts as the DICOM server, storing and managing medical images.
2. **OHIF**: A web-based DICOM viewer that allows users to visualize medical images stored in Orthanc.
3. **Keycloak**: Provides secure user authentication and access control, managing which users have access to the DICOM system.

These components communicate via APIs and protocols (such as DICOMweb), ensuring interoperability and easy deployment.

## Deployment Guide

### Step 1: Orthanc Setup
Orthanc will act as the PACS server for storing and managing DICOM images.

1. Clone the Orthanc repository or use Docker to pull the official image:
   ```bash
   docker pull jodogne/orthanc-plugins
   ```
2. Create a `docker-compose.yml` file for Orthanc and configure the settings (storage, networking, etc.).

3. Configure the Orthanc configuration file:
   ```json
   {
     "Name": "Orthanc",
     "StorageDirectory": "/var/lib/orthanc/db",
     "AuthenticationEnabled": true,
     "RegisteredUsers": { "admin": "password" }
   }
   ```

4. Run Orthanc using Docker Compose:
   ```bash
   docker-compose up -d
   ```

For detailed instructions, see the [Orthanc documentation](https://book.orthanc-server.com/users/getting-started.html).

### Step 2: OHIF Viewer Setup
OHIF provides a web interface for viewing DICOM images stored in Orthanc.

1. Clone the OHIF repository or pull the Docker image:
   ```bash
   docker pull ohif/viewer
   ```

2. Modify the configuration to point OHIF to your Orthanc instance:
   ```json
   {
     "servers": {
       "dicomWeb": {
         "name": "Orthanc",
         "wadoUriRoot": "http://localhost:8042/wado",
         "qidoRoot": "http://localhost:8042/dicom-web",
         "wadoRoot": "http://localhost:8042/dicom-web",
         "supportsFuzzyMatching": true
       }
     }
   }
   ```

3. Run OHIF using Docker Compose:
   ```bash
   docker-compose up -d
   ```

For more information, refer to the [OHIF documentation](https://docs.ohif.org/).

### Step 3: Keycloak Setup
Keycloak provides authentication and access management to secure the PACS.

1. Pull the official Keycloak image:
   ```bash
   docker pull quay.io/keycloak/keycloak
   ```

2. Create a `docker-compose.yml` for Keycloak and set up a realm for your users.

3. Set up user roles and permissions within Keycloak to ensure secure access to Orthanc and OHIF.

4. Enable Keycloak authentication in OHIF by modifying its settings to redirect to Keycloak for login.

More information is available in the [Keycloak documentation](https://www.keycloak.org/docs).

## Configuration

- **Orthanc**: Update the `orthanc.json` file for storage, network settings, and user roles.
- **OHIF**: Customize the `config.json` file to integrate with your Orthanc server and Keycloak for authentication.
- **Keycloak**: Set up realms, roles, and users. Ensure OHIF redirects to Keycloak for SSO.

## Usage

Once the deployment is complete:

- Access **Orthanc** at `http://localhost:8042` to manage DICOM images.
- Use the **OHIF Viewer** at `http://localhost:3000` to view DICOM images.
- Administer users and roles through **Keycloak** at `http://localhost:8080`.

### Example Workflow
1. Upload DICOM files to Orthanc via the web interface or API.
2. View the uploaded images in the OHIF Viewer.
3. Secure access through Keycloak, allowing authorized users to view and manage the DICOM images.

## Contributing

Contributions are welcome! Feel free to submit issues, fork the repo, or open pull requests to improve the guide or add additional features.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---

This version of the README file provides a clear, detailed guide for setting up the PACS DICOM system, ensuring users can follow along and deploy the system themselves. You can also add more detailed steps or expand on certain sections as needed.

