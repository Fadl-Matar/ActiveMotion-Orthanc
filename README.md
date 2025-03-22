
# ActiveMotion-Orthanc

This repository provides a guide to deploying a PACS DICOM system using Orthanc as the server, OHIF as the DICOM viewer, and Keycloak for access management. With this setup, you can securely manage, store, and view medical images, enabling scalable and interoperable solutions for healthcare and research environments.

## Table of Contents
- [Introduction](#introduction)
- [Architecture Overview](#architecture-overview)
- [Deployment Guide](#deployment-guide)
  - [Step 1: Deploying the PACS System](#step-1-deploying-the-pacs-system)
- [Configuration](#configuration)
- [Usage](#usage)

## Introduction

This project aims to provide a complete solution for deploying your own DICOM system for medical imaging management. Whether you're setting up a PACS for research, clinical use, or educational purposes, this guide offers detailed instructions for deploying three major components using Docker Compose:

- **Orthanc**: Lightweight, open-source DICOM server to manage medical imaging data.
- **OHIF Viewer**: Web-based DICOM viewer that integrates seamlessly with Orthanc.
- **Keycloak**: Identity and access management system to secure your infrastructure.

## Architecture Overview

The system consists of three primary components:

1. **Orthanc**: Acts as the DICOM server for storing and managing medical images.
2. **OHIF**: A web-based DICOM viewer that allows users to visualize medical images stored in Orthanc.
3. **Keycloak**: Provides secure user authentication and access control, managing which users have access to the DICOM system.

These components communicate via APIs and protocols (such as DICOMweb), ensuring interoperability and easy deployment.

## Deployment Guide

### Step 1: Deploying the PACS System

1. **Clone this repository** or ensure that your local directory has the `docker-compose.yml` file provided.

2. **Environment Variables**: Ensure that you have set the required environment variables for services like Keycloak and Orthanc in a `.env` file. The required variables include:

   ```bash
SECRET_KEY=ECC38B9B265CC51BE795A234E75AE
KEYCLOAK_CLIENT_SECRET=mG0byxP4b251X9nCDnvdg4hVdF7C5vqo
POSTGRES_PASSWORD=keycloak
KC_DB_PASSWORD=keycloak
KEYCLOAK_ADMIN_PASSWORD=admin

# URLs
KEYCLOAK_URI=https://active.kyz.dk/keycloak/realms/orthanc
KEYCLOAK_ADMIN_URI=https://active.kyz.dk/keycloak/admin/orthanc
PUBLIC_ORTHANC_ROOT=https://active.kyz.dk/orthanc/
PUBLIC_LANDING_ROOT=https://active.kyz.dk/orthanc/ui/app/token-landing.html
PUBLIC_OHIF_ROOT=https://active.kyz.dk/
KC_HOSTNAME_URL=https://active.kyz.dk/keycloak
KC_HOSTNAME_ADMIN_URL=https://active.kyz.dk/keycloak

# Database User
KC_DB_USERNAME=keycloak
POSTGRES_USER=keycloak
POSTGRES_DB=keycloak

# Other Environment Variables
KC_HOSTNAME=active.kyz.dk
   ```

3. **Run the deployment**: In the directory containing the `docker-compose.yml` file, run the following command to start all services:
   
   ```bash
   docker-compose up -d
   ```

   This command will launch the entire PACS system, including Orthanc, OHIF Viewer, and Keycloak.

4. **Monitor the deployment**: You can check the logs to ensure the containers are running correctly:
   
   ```bash
   docker-compose logs -f
   ```

## Configuration

- **Orthanc**: You can update the `orthanc.json` configuration file for custom storage paths, networking, and user roles.
- **OHIF**: Modify the `app-config.js` file to point OHIF to your Orthanc server and configure it for Keycloak integration.
- **Keycloak**: Set up realms, roles, and users via the Keycloak admin interface. Ensure that OHIF is configured to redirect users to Keycloak for authentication.

## Usage

Once the deployment is complete:

- Access **Orthanc** at `http://localhost:8042` to manage DICOM images.
- Use the **OHIF Viewer** at `http://localhost:3000` to view DICOM images.
- Administer users and roles through **Keycloak** at `http://localhost:8080`.

### Example Workflow

1. Upload DICOM files to Orthanc via the web interface or API.
2. View the uploaded images in the OHIF Viewer.
3. Secure access through Keycloak, allowing authorized users to view and manage the DICOM images.

