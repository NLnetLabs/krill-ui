import { Translations } from '../core/translations';

export const translations: Translations = {
  'common': {
    'readthedocs': 'Read the Docs',
    'report': 'Report a problem',
    'confirm': 'Confirm',
    'cancel': 'Cancel',
    'ok': 'OK',
    'error': 'Error',
    'success': 'Success!',
    'copy': 'Copy to clipboard',
    'download': 'Download',
    'dropOrClick': 'Drop file here or <em>click to upload</em>',
    'started': 'Krill has been running since',
    'newversion': 'New version available!',
    'supportcontracts': 'Support contracts',
    'warning': 'Warning',
    'idle': 'You have been logged out because of inactivity.',
    'nodata': 'No data',
    'copySuccess': 'XML copied to your clipboard',
    'edit': 'Edit',
    'page': 'page',
    'userInfo': {
      'title': 'Login Details',
      'user': 'User'
    }
  },
  'login': {
    'password': 'Password',
    'placeholder': 'Your password',
    'signin': 'Sign In',
    'required': 'Please enter your password',
    'error': 'The credentials you specified are wrong',
    'copied': 'You should not get your passwords from <a href=\'https://xkcd.com/936/\' target=\'_blank\'>https://xkcd.com/936/</a>',
    'id': 'Username',
    'idPlaceholder': 'Your username',
    'idRequired': 'Please enter your username',
    'retry': 'Click {0} to return to the login page.',
    'here': 'here'
  },
  'onboarding': {
    'welcome': 'Welcome to Krill',
    'welcomeHtml': 'Let\'s start by creating your RPKI Certificate Authority (CA). It will be used to configure Delegated RPKI with one or multiple parent CAs, usually your Regional or National Internet Registry.<br><br>The handle you choose will identify your CA in interactions with parent and child CAs. It will not be published in the RPKI. Please choose a handle that helps others recognise your organisation. Once set, the handle cannot be changed.',
    'addCAForm': {
      'required': 'This field is required',
      'format': 'This is not a valid CA name',
      'confirm': 'Create CA',
      'confirmation': {
        'title': 'Warning',
        'message': 'Once set, the handle cannot be changed. Continue?'
      }
    }
  },
  'cas': {
    'loading': 'Loading Certificate Authorities',
    'ca': 'Certificate Authority',
    'cas': 'Certificate Authorities',
    'search': 'Search CAs...',
    'noCas': 'There are currently no Certificate Authorities defined.'
  },
  'caDetails': {
    'loading': 'Loading {handle}',
    'current': 'Current Certificate Authority',
    'download': 'Download PEM',
    'noRoas': 'No ROAs found.',
    'noResources': 'You have not received any resources yet',
    'noChildren': 'No children found.',
    'addRoa': 'Add ROA',
    'roas': 'ROAs',
    'resources': 'Resources',
    'parents': 'Parents',
    'repo': 'Repository',
    'type': 'Type',
    'properties': 'Properties',
    'property': 'Property',
    'value': 'Value',
    'kind': 'Kind',
    'resource': 'Resource',
    'children': 'Children',
    'handle': 'Handle',
    'comment': 'Comment',
    'maxLength': 'Max Length',
    'maxLengthTooltip': 'If max length is not specified (-), it defaults to the prefix length.',
    'confirmation': {
      'title': 'Warning',
      'message': 'This will remove the ROA \'{prefix}-{max_length} => {asn}\'. Continue?',
      'added': 'ROA added',
      'retired': 'ROA removed',
      'retiredSuccess': 'The ROA has been removed',
      'addedSuccess': 'The ROA has been added'
    },
    'addROAForm': {
      'required': 'This field is required',
      'asn_format': 'This is not a valid ASN',
      'prefix_format': 'Please enter a valid IPv4 or IPv6 prefix'
    },
    'onboardingWarning': 'You will need to connect your CA to a public RPKI repository where it can publish your certificate and ROAs. As soon as the parent configuration is completed, relying party software will immediately start fetching your certificate and the ROAs you create from this repository.',
    'initializeRepository': 'You still need to configure a repository for your CA before it can request resource certificate(s) from its parent(s)',
    'initialize': 'Please initialize the RPKI repository and/or the parent first.',
    'noResourcesYet': 'You have not received any resources yet',
    'clickToRefresh': 'Click here to refresh',
    'parentsTab': {
      'request': 'Child Request',
      'response': 'Parent Response',
      'addParent': 'Add an additional parent',
      'addParentSuccess': 'Parent added',
      'name': 'Parent Name',
      'namerequired': 'The parent name is required',
      'nameformat': 'This is not a valid parent name'
    },
    'repoTab': {
      'request': 'Publisher Request',
      'addRepo': 'Add a repository',
      'response': 'Repository Response',
      'addRepoSuccess': 'Repository added'
    },
    'analyseThis': 'Analyse my ROAs',
    'analysis': 'ROA Analysis',
    'suggestions': {
      'following': 'Please verify the following suggested changes to your ROAs.',
      'readMore': 'Read more..',
      'nochanges': 'We suggest no changes at this time',
      'adding': 'Adding',
      'removing': 'Removing ROA',
      'keep': 'Keep everything as is.',
      'willResult': 'Will result in',
      'yourChoice': 'Your choice',
      'ourSuggestion': 'Our Suggestion',
      'ourSuggestionHelp': 'Our suggestion is based on RIPE RIS Routing information, please verify!',
      'addThis': 'Add this',
      'removeThis': 'Remove this',
      'willAdd': 'Will add this ROA',
      'willRemove': 'Will remove this ROA',
      'reasons': {
        'not_found': 'Allow announcement not covered by any of your ROAs',
        'not_held': 'ROA cannot be published, its prefix is no longer on your certificate(s)',
        'invalid_asn': 'Allow announcement from new ASN',
        'invalid_length': 'Allow more specific announcement for ASN',
        'stale': 'No announcements seen for ROA',
        'disallowing': 'This ROA disallows announcements only. If this is intentional you may want to use an AS0 ROA instead.',
        'as0_redundant': 'Redundant ROA',
        'redundant': 'Redundant ROA',
        'too_permissive': 'ROA permits extra announcements and may be abused for path spoofing hijacks',
        'specific': 'Allow specific announcement in a ROA which may be too permissive',
        'new': 'New'
      }
    },
    'syncParents': 'Refresh Parents',
    'syncRepo': 'Refresh Repository',
    'lastExchange': 'Last Exchange',
    'exchangeUri': 'URI',
    'nextExchange': 'Next Exchange Before',
    'allResources': 'All Resources',
    'entitlements': 'Entitlements',
    'showEntitlements': 'Show Detailed Entitlements',
    'parentCertificate': 'Parent Certificate',
    'published': 'Published'
  },
  'announcements': {
    'noRoasOrAnnouncements': 'No ROAs or Announcements found.',
    'search': 'Search for ASN, prefix, state...',
    'authorizes': 'Authorizes {number} announcements',
    'disallows': 'Disallows {number} announcements',
    'asn': 'ASN',
    'prefix': 'Prefix',
    'stateLabel': 'State',
    'state': {
      'roa_seen': 'SEEN',
      'roa_seen_help': 'This ROA matches announcements seen in BGP',
      'roa_unseen': 'NOT SEEN',
      'roa_unseen_help': 'We do not see any BGP announcements matching this ROA',
      'roa_not_held': 'PREFIX REMOVED',
      'roa_not_held_help': 'The prefix is no longer on your certificate(s), the ROA will not be published',
      'roa_no_announcement_info': 'NO ANNOUNCEMENT INFO',
      'roa_too_permissive': 'TOO PERMISSIVE',
      'roa_too_permissive_help': 'This ROA matches announcements in BGP, but also allows unseen announcements',
      'roa_disallowing': 'DISALLOWING',
      'roa_disallowing_help': 'This ROA disallows announcements only. If this is intentional you may want to use an AS0 ROA instead.',
      'roa_redundant': 'REDUNDANT',
      'roa_redundant_help': 'This ROA is redundant because there are one or more other ROAs covering its prefix, length and ASN',
      'roa_as0': 'AS0',
      'roa_as0_help': 'This ROA serves to disallow all announcements for a prefix',
      'roa_as0_redundant': 'REDUNDANT',
      'roa_as0_redundant_help': 'This AS0 ROA is redundant because there are one or more other ROAs covering its prefix',
      'announcement_not_found': 'NOT FOUND',
      'announcement_not_found_help': 'This announcement is not covered by any of your ROAs',
      'announcement_invalid_length': 'INVALID LENGTH',
      'announcement_invalid_length_help': 'This announcement is not allowed because it is more specific than the prefix and max length you authorized for this ASN',
      'announcement_invalid_asn': 'INVALID ASN',
      'announcement_invalid_asn_help': 'This announcement is not allowed because you only authorized the prefix from another ASN'
    },
    'download': 'Download CSV'
  },
  'deltaErrors': {
    'duplicates': 'Duplicates',
    'covered': 'Covered',
    'notheld': 'Notheld',
    'unknowns': 'Unknowns',
    'invalid_length': 'Invalid Length',
    'covering': 'Covering',
    'as0_exists': 'AS0 Exists',
    'as0_overlaps': 'AS0 Overlaps'
  },
  'errors': {
    'repo_not_set': 'You must configure a repository first',
    'pub_unknown': 'Publisher \'{publisher}\' is unknown',
    'pub_duplicate': 'Publisher \'{publisher}\' was already initialised',
    'pub_outside_jail': 'Publisher uri \'{uri}\' outside repository uri \'{sia_base}\'',
    'pub_uri_no_slash': 'Publisher uri \'{uri}\' must have a trailing slash',
    'pub_no_embedded_repo': 'No embedded repository configured',
    'ca_duplicate': 'CA \'{ca}\' was already initialised',
    'ca_unknown': 'CA \'{ca}\' is unknown',
    'ca_repo_same': 'This repository is already in use',
    'ca_repo_issue': 'Received error from repository: {cause}',
    'ca_repo_response_invalid_xml': 'Got invalid repository response xml',
    'ca_repo_response_wrong_xml': 'Got parent instead of repository response',
    'ca_parent_duplicate': 'You already have a parent named \'{parent}\'',
    'ca_parent_xml_duplicate': 'This response is already used by a parent named \'{parent}\'',
    'ca_parent_unknown': 'You do not have a parent named \'{parent}\'',
    'ca_parent_issue': 'Received error from parent \'{parent}\': {cause}',
    'ca_parent_response_invalid_xml': 'Got invalid parent response xml',
    'ca_parent_response_wrong_xml': 'Got repository response when adding parent',
    'ca_child_duplicate': 'You already have a child CA named \'{child}\'',
    'ca_child_unknown': 'You do not have a child CA named \'{child}\'',
    'ca_child_resources_required': 'You must specify resources for Child CA \'{child}\'',
    'ca_roa_unknown': 'Cannot remove unknown ROA \'{prefix}-{max_length} => {asn}\'',
    'ca_roa_duplicate': 'Duplicate ROA \'{prefix}-{max_length} => {asn}\'',
    'ca_roa_invalid_max_length': 'Invalid max length in ROA \'{prefix}-{max_length} => {asn}\'',
    'ca_roa_not_entitled': 'ROA prefix \'{prefix}\' is not on any of your current certificates',
    'ta_not_allowed': 'This functionality is not supported by the test Trust Anchor',
    'ta_name_reserved': 'Name reserved',
    'ca_roa_delta_error': 'ROA rejected because of the following issue(s)',
    'api_insufficient_rights': 'Your user does not have sufficient rights to perform this action. Please contact your administrator.',
    'api_invalid_credentials': 'The supplied login credentials were incorrect.',
    'api_login_error': 'An error occurred while logging you in: {cause}',
    'api_auth_transient_error': 'A (temporary) error occured while trying to authenticate your request. Please try again later.',
    'api_auth_permanent_error': 'An error occurred while trying to authenticate your request. Please contact your administrator.',
    'api_auth_session_expired': 'Your login session has expired. Please login again..',
    'general_error': 'Something went wrong. Please contact your administrator.'
  },
  'testbed': {
    'welcome': 'Welcome to this RPKI testbed',
    'disclaimer': {
      'heading': 'Disclaimer',
      'body': 'This testbed offers a completely independent RPKI hierarchy, which can be used for evaluation purposes. It allows you to register any resources for your Child CA. No guarantees are given concerning the availability of this service. If you find any issues, <a href=\'https://github.com/NLnetLabs/krill/issues/new\'>please let us know</a>.'
    },
    'rpconfighelp': {
      'heading': 'Testbed TAL',
      'body': 'To fetch the data published by this testbed, please download this <a href=\'{tallink}\'>Trust Anchor Locator</a> (TAL) and configure it in your Relying Party Software. Note that you should NEVER use this TAL in a production environment. This is provided for testing only.'
    },
    'regunreg': {
      'heading': 'Register/Unregister',
      'body': '<p>Use the form to register your RPKI Certificate Authority as a child of the testbed so you can create Route Origin Authorisations (ROAs) for the resources that you claim.</p><p>If you do not wish to host your own Rsync and RRDP repositories you can use the Register Publisher form to configure publishing your ROAs in the respository hosted by the testbed. Use the Unregister forms to cancel previously established relationships (even those of other testbed users!).</p>'
    },
    'rfcdoclink': 'Click to view the RFC-8183 documentation for this XML',
    'childhandle': 'Child Handle',
    'publisherhandle': 'Publisher Handle',
    'responseXML': 'Testbed response XML',
    'addChild': {
      'heading': 'Register CA',
      'requestXML': {
        'label': 'Child Request XML',
        'placeholder': 'Paste your <child_request/> XML here'
      },
      'asnresources': {
        'label': 'ASN Resources',
        'placeholder': 'The AS resources: e.g. AS1, AS3-4'
      },
      'ipv4resources': {
        'label': 'IPv4 Resources',
        'placeholder': 'The IPv4 resources: e.g. 192.168.0.0/16'
      },
      'ipv6resources': {
        'label': 'IPv6 Resources',
        'placeholder': 'The IPv6 resources: e.g. 2001:db8::/32'
      },
      'confirm': 'Register child CA',
      'format': 'This is not a valid child request XML',
      'required': 'Please provide the child request XML',
      'confirmation': {
        'title': 'Warning',
        'message': 'Are you sure you want to register this child with the testbed?'
      },
      'success': 'Child CA \'{child_handle}\' has been added to the testbed.',
      'registeranother': 'Register another CA'
    },
    'removeChild': {
      'heading': 'Unregister CA',
      'placeholder': 'Enter the CA name to remove',
      'confirm': 'Remove child CA',
      'confirmation': {
        'title': 'Warning',
        'message': 'Are you sure you want to unregister this child with the testbed?'
      },
      'success': 'Child CA \'{child_handle}\' has been removed from the testbed.'
    },
    'addPublisher': {
      'heading': 'Register Publisher',
      'requestXML': {
        'label': 'Publisher Request XML',
        'placeholder': 'Paste your <publisher_request/> XML here'
      },
      'confirm': 'Register publisher',
      'format': 'This is not a valid publisher request XML',
      'required': 'Please provide the publisher request XML',
      'confirmation': {
        'title': 'Warning',
        'message': 'Are you sure you want to register this publisher with the testbed?'
      },
      'success': 'Publisher \'{publisher_handle}\' has been added to the testbed.',
      'registeranother': 'Register another Publisher'
    },
    'removePublisher': {
      'heading': 'Unregister Publisher',
      'placeholder': 'Enter the Publisher name to remove',
      'confirm': 'Remove publisher',
      'confirmation': {
        'title': 'Warning',
        'message': 'Are you sure you want to unregister this publisher with the testbed?'
      },
      'success': 'Publisher \'{publisher_handle}\' has been removed from the testbed.'
    },
    'errors': {
      'invalid_xml': 'Invalid XML: {err}',
      'missing_xml_el': 'Missing element {el}',
      'missing_xml_child_el': 'Missing child element {el} of element {parent}',
      'missing_xml_attr': 'Missing attribute {attr} on element {el}',
      'empty_xml_el': 'Element {el} cannot be empty',
      'empty_xml_attr': 'Attribute {attr} on element {el} cannot be empty',
      'non_ascii_xml_el': 'Element {el} cannot contain non-ASCII characters',
      'child_handle_required': 'Child Handle is required',
      'publisher_handle_required': 'Publisher Handle is required',
      'non_base64_certificate_xml_el': 'Element {el} must contain a correctly Base64 encoded self-signed X.509 BPKI certificate',
      'invalid_registration_data': 'Your registration details could not be parsed correctly'
    }
  }
};
