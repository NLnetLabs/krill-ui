import { Translations } from '../core/translations';

export const translations: Translations = {
  'common': {
    'readthedocs': 'Read the Docs',
    'report': 'Meld een probleem',
    'confirm': 'Bevestig',
    'cancel': 'Annuleer',
    'ok': 'OK',
    'error': 'Fout',
    'success': 'Geslaagd!',
    'copy': 'Kopiëer naar klembord',
    'download': 'Download',
    'dropOrClick': 'Sleep een bestand hierheen of <em>klik om te uploaden</em>',
    'started': 'Krill is actief sinds',
    'newversion': 'Nieuwe versie beschikbaar!',
    'supportcontracts': 'Supportcontracten',
    'warning': 'Waarschuwing',
    'idle': 'U bent uitgelogd wegens inactiviteit.',
    'nodata': 'Geen data',
    'copySuccess': 'De XML is naar uw klembord gekopiëerd',
    'edit': 'Edit',
    'page': 'page',
    'userInfo': {
      'title': 'Login Details',
      'user': 'Gebruiker'
    }
  },
  'login': {
    'password': 'Wachtwoord',
    'placeholder': 'Uw wachtwoord',
    'signin': 'Log In',
    'required': 'Voer alstublieft uw wachtwoord in',
    'error': 'Het wachtwoord is niet correct',
    'copied': 'Gebruik geen wachtwoorden van <a href=\'https://xkcd.com/936/\' target=\'_blank\'>https://xkcd.com/936/</a>',
    'id': 'Gebruiker',
    'idPlaceholder': 'Uw gebruikersnaam',
    'idRequired': 'Voer uw gebruikersnaam in',
    'retry': 'Klik {0} om terug te gaan naar de login pagina.',
    'here': 'hier'
  },
  'onboarding': {
    'welcome': 'Welkom bij Krill',
    'welcomeHtml': 'Laten we beginnen met aanmaken van uw RPKI Certificaatautoriteit (CA). Het zal worden gebruikt om gedelegeerde RPKI te configureren met een of meerdere bovenliggende CAs, over het algemeen uw Regionaal of Nationaal Internet Register.<br><br>De naam die u kiest identificeert uw CA tijdens interacties met bovenliggende of ondergeschikte CAs. De gekozen naam wordt niet gepubliceerd in de RPKI. Kies een naam die anderen helpen om uw organisatie te identificeren. Eenmaal ingesteld kan de naam niet worden gewijzigd.',
    'addCAForm': {
      'required': 'Dit veld is verplicht',
      'format': 'Dit is geen geldige naam voor uw CA',
      'confirm': 'Creëer CA',
      'confirmation': {
        'title': 'Waarschuwing',
        'message': 'De naam kan later niet worden gewijzigd. Doorgaan?'
      }
    }
  },
  'cas': {
    'loading': 'Certificaatautoriteiten worden geladen',
    'ca': 'Certificaatautoriteit',
    'cas': 'Certificaatautoriteiten',
    'search': 'Zoek naar CAs...',
    'noCas': 'Er zijn op dit moment geen certificaatautoriteiten gedefinieerd.'
  },
  'caDetails': {
    'loading': '{handle} wordt geladen',
    // TODO translate
    'refresh': 'Refreshing {handle}, this might take several minutes',
    'current': 'Huidige certificaatautoriteit',
    'download': 'Download PEM',
    'noRoas': 'Geen ROAs gevonden.',
    'noResources': 'U heeft nog geen resources ontvangen',
    'noChildren': 'Geen ondergeschikte CAs gevonden.',
    'addRoa': 'Voeg ROA toe',
    'roas': 'ROAs',
    'resources': 'Resources',
    'parents': 'Bovenliggende CAs',
    'repo': 'Databank (repository)',
    'type': 'Type',
    'properties': 'Eigenschappen',
    'property': 'Eigenschap',
    'value': 'Waarde',
    'kind': 'Soort',
    'resource': 'Resource',
    'children': 'Children',
    'handle': 'Naam',
    // TODO: translate
    'comment': 'Opmerking',
    'maxLength': 'Maximale Lengte',
    'maxLengthTooltip': 'Als er geen maximale lengte is gedefinieerd (-), wordt de lengte van de prefix gebruikt.',
    'confirmation': {
      'title': 'Waarschuwing',
      'message': 'Hiermee wordt de ROA \'{prefix}-{max_length} => {asn}\' verwijderd. Doorgaan?',
      'added': 'ROA toegevoegd',
      'retired': 'ROA verwijderd',
      'retiredSuccess': 'De ROA is verwijderd',
      'addedSuccess': 'The ROA is toegevoegd',
      // TODO translate
      'commentUpdatedSuccess': 'The ROA comment has been updated',
    },
    'addROAForm': {
      'required': 'Dit veld is verplicht',
      'asn_format': 'Dit is geen geldige ASN',
      'prefix_format': 'Vul alstublieft een geldige IPv4 of IPv6 prefix in'
    },
    'onboardingWarning': 'Om uw certificaat en ROAs te publiceren moet uw CA verbonden worden met een publieke RPKI databank (repository). Zodra de configuratie met de bovenliggende CA is voltooid, zal software gebruikt door de vertrouwende partijen (RPKI validators) direct beginnen met het downloaden en verifiëren van uw certificaat en ROAs die gepubliceerd zijn in deze databank.',
    // TODO translate
    'initializeRepository': 'You still need to configure a repository for your CA before it can request resource certificate(s) from its parent(s)',
    'initialize': 'Initialiseer alstublieft eerst uw RPKI databank (repository) en/of de bovenliggende CA.',
    'noResourcesYet': 'U heeft nog geen resources ontvangen',
    'clickToRefresh': 'Klik hier om te verversen',
    'parentsTab': {
      'request': 'Child Request',
      'response': 'Parent Response',
      'addParent': 'Voeg een bovenliggende CA toe',
      'addParentSuccess': 'Bovenliggende CA toegevoegd',
      'name': 'Naam van de bovenliggende CA',
      'namerequired': 'Een naam voor de bovenliggende CA is verplicht',
      'nameformat': 'Dit is geen geldige naam'
    },
    'repoTab': {
      'request': 'Publisher Request',
      'response': 'Repository Response',
      // TODO translate
      'addRepo': 'Add a repository',
      'addRepoSuccess': 'Databank (repository) toegevoegd'
    },
    'analyseThis': 'Analiseer mijn ROAs',
    'analysis': 'ROA Analyse',
    'suggestions': {
      'following': 'Controleer a.u.b. de volgende voorgestelde wijzigingen in uw ROAs.',
      'readMore': 'Lees meer..',
      'nochanges': 'We suggereren op dit moment niets te wijzigen',
      'adding': 'Toe te voegen',
      'removing': 'Te verwijderen',
      'keep': 'Houdt zoals het is',
      'willResult': 'Zal resulteren in',
      'yourChoice': 'Uw keuze',
      'ourSuggestion': 'Onze suggestie',
      'ourSuggestionHelp': 'Onze suggestie is gebaseerd op RIPE RIS informatie, gelieve te controleren!',
      'addThis': 'Voeg toe',
      'removeThis': 'Verwijder',
      'willAdd': 'Voeg deze ROA toe vanwege status',
      'willRemove': 'Verwijder deze ROA vanwege status',
      'reasons': {
        'not_found': 'Niet gevonden',
        'not_held': 'ROA kan niet gepubliceerd worden, de prefix staat niet meer op uw certifica(a)t(en)',
        'invalid_asn': 'Ongeldig ASN',
        'invalid_length': 'Ongeldige lengte',
        'stale': 'Niet zichtbaar',
        'disallowing': 'Veroorzaakt ongeldige annoucements. Wellicht vervangen door AS0 ROA.',
        'as0_redundant': 'Overbodig',
        'redundant': 'Overbodig',
        'too_permissive': 'Te veroorlovend, kan misbruikt worden voor hijacks',
        'specific': 'Sta specifieke announcement toe ipv te veroorlovende ROA',
        'new': 'Nieuw'
      }
    },
    'syncParents': 'Synchroniseer met bovenliggende CAs',
    'syncRepo': 'Synchroniseer met databank (repository)',
    'lastExchange': 'Laatste uitwisseling',
    'exchangeUri': 'URI',
    'nextExchange': 'Volgende uitwisseling voor',
    'allResources': 'Uw gecertificeerde IP en ASN addressen',
    'entitlements': 'Gerechtigde addressen',
    'showEntitlements': 'Laat details zien',
    'parentCertificate': 'Parent Certificate',
    'published': 'Gepubliceerd'
  },
  'announcements': {
    'noRoasOrAnnouncements': 'Geen ROAs of BGP-aankondigingen gevonden.',
    'search': 'Zoek naar ASN, prefix, status...',
    'authorizes': 'Autoriseert {number} aankondigingen',
    'disallows': 'Weigert {number} aankondigingen',
    'asn': 'ASN',
    'prefix': 'Prefix',
    'stateLabel': 'Status',
    'state': {
      'roa_seen': 'ZICHTBAAR',
      'roa_seen_help': 'Deze ROA komt overeen met aankondigingen gezien in BGP',
      'roa_unseen': 'NIET ZICHTBAAR',
      'roa_unseen_help': 'We zien geen BGP aankondigingen overeenkomstig met deze ROA',
      'roa_not_held': 'PREFIX VERWIJDERD',
      'roa_not_held_help': 'Deze prefix staat niet meer op uw certifica(a)t(en), de ROA wordt niet gepubliceerd',
      'roa_no_announcement_info': 'GEEN AANKONDIGINGSINFORMATIE',
      'roa_too_permissive': 'TE VEROORLOVEND',
      'roa_too_permissive_help': 'Deze ROA komt overeen met aankondigingen gezien in BGP, maar staat ook additionele aankodigingen toe',
      'roa_disallowing': 'VEROORZAAKT ONGELDIGE AANKONDIGINGEN',
      'roa_disallowing_help': 'Deze ROA veroorzaakt ongeldige aankondigingen. Als dit uw bedoeling is gebruikt u wellicht beter een AS0 ROA.',
      'roa_redundant': 'OVERBODIG',
      'roa_redundant_help': 'Deze ROA is overbodig omdat u een of meer andere ROAs heeft voor de prefix, lengte en ASN',
      'roa_as0': 'AS0',
      'roa_as0_help': 'Deze ROA dient ervoor om alle aankondigingen van een prefix te verbieden',
      'roa_as0_redundant': 'OVERBODIG',
      'roa_as0_redundant_help': 'Deze AS0 ROA is overbodig omdat u een of meerdere andere ROAs heeft voor de prefix',
      'announcement_not_found': 'NIET GEVONDEN',
      'announcement_not_found_help': 'Deze BGP aankondiging wordt niet gedekt door uw ROAs',
      'announcement_invalid_length': 'ONGELDIGE LENGTE',
      'announcement_invalid_length_help': 'Deze BGP aankondigin is niet toegestaan, omdat de prefix specifieker is dan toegestaan voor dit ASN',
      'announcement_invalid_asn': 'ONGELDIG ASN',
      'announcement_invalid_asn_help': 'Deze BGP aankondigin is niet toegestaan, omdat de prefix enkel is toegestaan vanaf andere ASNs'
    },
    'download': 'Download CSV'
  },
  'deltaErrors': {
    'duplicates': 'ROA bestaat reeds',
    'covered': 'Overlappende ROA bestaat',
    'notheld': 'Niet uw prefix',
    'unknowns': 'ROA bestaat niet',
    'invalid_length': 'Invalide Lengte',
    'covering': 'Overlapt bestaande ROA',
    'as0_exists': 'Overlappende AS0 ROA bestaat',
    'as0_overlaps': 'Overlapt bestaande ROA'
  },
  'errors': {
    'repo_not_set': 'U dient eerst een databank (repository) te configureren',
    'pub_unknown': 'Publisher \'{publisher}\' is niet bekend',
    'pub_duplicate': 'Publisher \'{publisher}\' is al geïnitialiseerd',
    'pub_outside_jail': 'Publisher uri \'{uri}\' ligt buiten de repository uri \'{sia_base}\'',
    'pub_uri_no_slash': 'Publisher uri \'{uri}\' moet eindigen met een slash',
    'pub_no_embedded_repo': 'Geen geïntegreerde databank (repository) geconfigureerd',
    'ca_duplicate': 'CA \'{ca}\' is reeds geïnitialiseerd',
    'ca_unknown': 'CA \'{ca}\' is onbekend',
    'ca_repo_same': 'Deze databank (repository) is al in gebruik',
    'ca_repo_issue': 'Foutmelding ontvangen van de databank (repository): {cause}',
    'ca_repo_response_invalid_xml': 'Repository response xml is ongeldig',
    'ca_repo_response_wrong_xml': 'Parent response in plaats van repository response ontvangen',
    'ca_parent_duplicate': 'U heeft al een bovenliggende CA met de naam \'{parent}\'',
    'ca_parent_xml_duplicate': 'Deze response XML is al in gebruik door een bovenliggende CA met de naam \'{parent}\'',
    'ca_parent_unknown': 'U heeft geen bovenliggende CA me de naam \'{parent}\'',
    'ca_parent_issue': 'Fout ontvangen van bovenliggende CA \'{parent}\': {cause}',
    'ca_parent_response_invalid_xml': 'Ongeldige parent response xml ontvangen',
    'ca_parent_response_wrong_xml': 'Repository response ontvangen tijdens het toevoegen van de bovenliggende CA',
    'ca_child_duplicate': 'U heeft al een ondergeschikte CA met de naam \'{child}\'',
    'ca_child_unknown': 'U heeft geen ondergeschikte CA met de naam \'{child}\'',
    'ca_child_resources_required': 'U dient resources op te geven voor ondegeschikte CA \'{child}\'',
    'ca_roa_unknown': 'Kan onbekende ROA \'{prefix}-{max_length} => {asn}\' niet verwijderen',
    'ca_roa_duplicate': 'ROA \'{prefix}-{max_length} => {asn}\' bestaat al',
    'ca_roa_invalid_max_length': 'Ongeldige maxLength in ROA \'{prefix}-{max_length} => {asn}\'',
    'ca_roa_not_entitled': 'ROA prefix \'{prefix}\' staat niet op een van uw huidige certificaten',
    'ta_not_allowed': 'Deze functionaliteit wordt niet ondersteund door het test-vertrouwensanker',
    'ta_name_reserved': 'Naam gereserveerd',
    'ca_roa_delta_error': 'ROA geweigerd om de volgende reden(en):',
    'api_insufficient_rights': 'U heeft onvoldoende rechten om deze actie uit te voeren. Neem contact op met uw beheerder.',
    'api_invalid_credentials': 'De ingevoerde login gegegens zijn incorrect.',
    'api_login_error': 'Er trad een fout op tijdens het inloggen: {cause}',
    'api_auth_transient_error': 'Er trad een tijdelijke fout op bij het verifiëren van uw verzoek. Probeert u het later nog eens.',
    'api_auth_permanent_error': 'Er trad een fout op bij het verifiëren van uw verzoek. Neem contact op met uw beheerder.',
    'api_auth_session_expired': 'Uw sessie is verlopen. Gelieve opnieuw in te loggen.',
    'general_error': 'Er trad een fout op. Neem contact op met uw beheerder.'
  },
  'testbed': {
    'welcome': 'Welkom bij de RPKI test omgeving',
    'disclaimer': {
      'heading': 'Spelregels',
      'body': 'Deze test omgeving gebruikt een op zichzelf staande RPKI hierarchie en is bedoeld voor evaluatie doeleinden. U kunt hier uw test CA registreren met eender welke IP en ASN adressen. Er worden geen garanties gegeven over de beschikbaarheid van deze service. Als u problemen ondervindt, <a href=\'https://github.com/NLnetLabs/krill/issues/new\'>laat het ons dan weten</a>.'
    },
    'rpconfighelp': {
      'heading': 'Test omgeving TAL',
      'body': 'Om de data uit deze test omgevinge te valideren, kunt u deze <a href=\'{tallink}\'>Trust Anchor Locator</a> (TAL) configureren in uw validatie software. Merk op dat u deze TAL NOOIT in een productie omgeving gebruikt. Deze is enkel bedoeld voor tests.'
    },
    'regunreg': {
      'heading': '(De-)Registreren',
      'body': '<p>Gebruik het formulies om uw RPKI Certificate Authority (CA) als onderliggende CA onder een test CA te registreren.</p><p>Daarnaast kunt u uw CA hier registreren onder een Repository</p><p>Als u klaar bent testen, gelieve uw CA dan te de-registreren.</p>'
    },
    'rfcdoclink': 'Klik om de RFC-8183 documentatie voor deze XML te zien',
    'childhandle': 'Child Handle',
    'publisherhandle': 'Publisher Handle',
    'responseXML': 'Testbed response XML',
    'addChild': {
      'heading': 'Registreer CA',
      'requestXML': {
        'label': 'Child Request XML',
        'placeholder': 'Plak uw <child_request/> XML hier'
      },
      'asnresources': {
        'label': 'ASN Resources',
        'placeholder': 'AS resources: bv. AS1, AS3-4'
      },
      'ipv4resources': {
        'label': 'IPv4 Resources',
        'placeholder': 'IPv4 resources: bv. 192.168.0.0/16'
      },
      'ipv6resources': {
        'label': 'IPv6 Resources',
        'placeholder': 'IPv6 resources: bv. 2001:db8::/32'
      },
      'confirm': 'Registreer CA',
      'format': 'Dit is geen valide child request XML',
      'required': 'Voegt u aub de child request XML toe',
      'confirmation': {
        'title': 'Waarschuwing',
        'message': 'Weet u zeker dat u deze CA onder deze test omgeving wil registreren?'
      },
      'success': 'CA \'{child_handle}\' is toegevoegd aan de test omgeving.',
      'registeranother': 'Registreer nog een CA'
    },
    'removeChild': {
      'heading': 'Deregistreer CA',
      'placeholder': 'Voer de naam van uw CA in',
      'confirm': 'Deregistreer CA',
      'confirmation': {
        'title': 'Waarschuwing',
        'message': 'Weet u zeker dat u deze CA onder deze test omgeving wil deregistreren?'
      },
      'success': 'CA \'{child_handle}\' is verwijderd van de test omgeving.'
    },
    'addPublisher': {
      'heading': 'Registreer Publisher',
      'requestXML': {
        'label': 'Publisher Request XML',
        'placeholder': 'Plak uw <publisher_request/> XML here'
      },
      'confirm': 'Registreer publisher',
      'format': 'Dit is geen valide publisher request XML',
      'required': 'Voegt u aub de publisher request XML toe',
      'confirmation': {
        'title': 'Waarschuwing',
        'message': 'Weet u zeker dat u uw CA als publisher wil registreren?'
      },
      'success': 'Publisher \'{publisher_handle}\' is geregistreerd in de test omgeving.',
      'registeranother': 'Registreer nog een Publisher'
    },
    'removePublisher': {
      'heading': 'Deregistreer Publisher',
      'placeholder': 'Voer de naam van de publisher in',
      'confirm': 'Deregistreer Publisher',
      'confirmation': {
        'title': 'Waarschuwing',
        'message': 'Weet u zeker dat u uw CA als publisher wil deregistreren?'
      },
      'success': 'Publisher \'{publisher_handle}\' is gederegistreerd van de test omgeving.'
    },
    'errors': {
      'invalid_xml': 'Invalid XML: {err}',
      'missing_xml_el': 'Missing element {el}',
      'missing_xml_child_el': 'Missing child element {el} of element {parent}',
      'missing_xml_attr': 'Missing attribute {attr} on element {el}',
      'empty_xml_el': 'Element {el} cannot be empty',
      'empty_xml_attr': 'Attribute {attr} on element {el} cannot be empty',
      // TODO translate
      'non_ascii_xml_el': 'Element {el} cannot contain non-ASCII characters',
      'child_handle_required': 'CA naam is vereist',
      'publisher_handle_required': 'Publisher naam is vereist',
      'non_base64_certificate_xml_el': 'Element {el} must contain a correctly Base64 encoded self-signed X.509 BPKI certificate',
      'invalid_registration_data': 'Your registration details could not be parsed correctly'
    }
  }
};
