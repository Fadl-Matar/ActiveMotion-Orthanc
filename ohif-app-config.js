window.config = {
    extensions: [],
    modes: [],
    customizationService: {
      // Customization settings
    },
    showStudyList: true,
    maxNumberOfWebWorkers: 3,
    omitQuotationForMultipartRequest: true,
    showWarningMessageForCrossOrigin: true,
    showCPUFallbackMessage: true,
    showLoadingIndicator: true,
    strictZSpacingForVolumeViewport: true,
    maxNumRequests: {
      interaction: 100,
      thumbnail: 75,
      prefetch: 25,
    },
    httpErrorHandler: error => {
      console.warn(error.status);
    },
    hotkeys: [
      // List of hotkeys
    ],
    investigationalUseDialog: {
      option: 'never',
    },
    oidc: [
      {
        authority: 'http://localhost/keycloak/realms/orthanc',
        client_id: 'ohif-viewer',
        redirect_uri: `${window.location.origin}/ohif/callback`,
        response_type: 'code',
        scope: 'openid profile email',
        post_logout_redirect_uri: `${window.location.origin}/logout-redirect.html`,
        silent_redirect_uri: `${window.location.origin}/silent-renew.html`,
        automaticSilentRenew: true,
        revokeAccessTokenOnSignout: true,
        filterProtocolClaims: true,
        loadUserInfo: true,
      },
    ],
  };
  
  window.config.routerBasename = '/ohif';
  
  window.config.dataSources = [
    {
      friendlyName: 'Orthanc DICOMweb',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        name: 'orthanc',
        wadoUriRoot: '/orthanc/dicom-web',
        qidoRoot: '/orthanc/dicom-web',
        wadoRoot: '/orthanc/dicom-web',
        qidoSupportsIncludeField: true,
        supportsReject: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,pdf,video',
        acceptHeader: ['multipart/related; type=application/octet-stream; transfer-syntax=*'],
        },
      },
    },
  ];
  
  window.config.defaultDataSourceName = 'dicomweb';
  initViewer();
  
