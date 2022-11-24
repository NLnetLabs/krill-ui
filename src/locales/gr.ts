import { Translations } from '../core/translations';

export const translations: Translations = {
  'common': {
    'readthedocs': 'Read the Docs',
    'report': 'Αναφορά προβλήματος',
    'confirm': 'Επιβεβαίωση',
    'cancel': 'Ακύρωση',
    'ok': 'OK',
    'error': 'Σφάλμα',
    'success': 'Επιτυχία!',
    'copy': 'Αντιγραφή στο πρόχειρο',
    'download': 'Λήψη',
    'dropOrClick': 'Σύρετε το αρχείο εδώ ή <em>κάντε κλίκ για μεταφόρτωση</em>',
    'started': 'Το Krill τρέχει από',
    'newversion': 'Νέα έκδοση διαθέσιμη!',
    'supportcontracts': 'Συμβάσεις Υποστήριξης',
    'warning': 'Προειδοποίηση',
    'idle': 'Έχετε αποσυνδεθεί λόγω αδράνειας.',
    'nodata': 'Δεν υπάρχουν δεδομένα',
    'copySuccess': 'To XML αρχείο αντιγράφηκε στο πρόχειρο',
    'edit': 'Επεξεργασία',
    'page': 'page',
    'userInfo': {
      'title': 'Στοιχεία Σύνδεσης',
      'user': 'Χρήστης'
    }
  },
  'login': {
    'password': 'Κωδικός',
    'placeholder': 'Ο κωδικός σας',
    'signin': 'Είσοδος',
    'required': 'Παρακαλώ εισάγετε τον κωδικό σας',
    'error': 'Ο κωδικός που χρησιμοποιήσατε δεν είναι σωστός',
    'copied': 'Ο κωδικός σας δεν πρέπει να προέρχεται από <a href=\'https://xkcd.com/936/\' target=\'_blank\'>https://xkcd.com/936/</a>',
    'id': 'Όνομα χρήστη',
    'idPlaceholder': 'Το όνομα χρήστη σας',
    'idRequired': 'Παρακαλώ εισάγετε το όνομα χρήστη σας',
    'retry': 'Επιλέξτε {0} για επιστροφή στη σελίδα σύνδεσης.',
    'here': 'εδώ'
  },
  'onboarding': {
    'welcome': 'Καλωσήρθατε στο Krill',
    'welcomeHtml': 'Ας αρχήσουμε δημιουργώντας τη δικιά σας Αρχή Πιστοποίησης RPKI (CA). Θα χρησιμοποιηθεί για να διαμορφώσουμε εξουσιοδοτημένο RPKI με έναν ή περισσότερους CA-γονείς, συνήθως τον Τοπικό (RIR) ή Εθνικό (NIR) Οργανισμό Διαχείρισης Πόρων Διαδικτύου.<br><br>Η επιλεγμένη ονομασία θα ταυτοποιεί την Αρχή Πιστοποίησής (CA) σας σε αλληλεπιδράσεις με CA-γονείς και CA-παιδιά. Η ονομασία δεν δημοσιεύεται στο RPKI. Παρακαλώ διαλέξτε μία ονομασία που θα βοηθάει στην αναγνώριση του οργανισμού σας από άλλους. Η ονομασία δεν μπορεί να αλλάξει αφού οριστεί.',
    'addCAForm': {
      'required': 'Το πεδίο είναι υποχρεωτικό',
      'format': 'Το όνομα της Αρχής Πιστοποίησης (CA) δεν είναι έγκυρο',
      'confirm': 'Δημιουργία Αρχής Πιστοποίησης (CA)',
      'confirmation': {
        'title': 'Προειδοποίηση',
        'message': 'Η ονομασία δεν μπορεί να αλλάξει αφού οριστεί. Συνέχεια;'
      }
    }
  },
  'cas': {
    'loading': 'Φόρτωση Αρχών Πιστοποίησης (CAs)',
    'ca': 'Αρχή Πιστοποίησης (CA)',
    'cas': 'Αρχές Πιστοποίησης (CAs)',
    'search': 'Αναζήτηση Αρχών Πιστοποίησης (CAs)...',
    'noCas': 'Δεν έχουν οριστεί Αρχές Πιστοποίησης (CAs) ακόμα.'
  },
  'caDetails': {
    'loading': 'Φόρτωση {handle}',
    // TODO translate
    'refresh': 'Refreshing {handle}, this might take several minutes',
    'current': 'Τρέχουσα Αρχή Πιστοποίησης (CA)',
    'download': 'Λήψη PEM',
    'noRoas': 'Δεν βρέθηκαν ROA.',
    'noResources': 'Δεν έχετε λάβει κανέναν πόρο ακόμα',
    'noChildren': 'Δεν βρέθηκαν CA-παιδιά.',
    'addRoa': 'Προσθήκη ROA',
    'roas': 'ROA',
    'resources': 'Πόροι',
    'parents': 'CA-γονείς',
    'repo': 'Αποθετήριο (repository)',
    'type': 'Τύπος',
    'properties': 'Ιδιότητες',
    'property': 'Ιδιότητα',
    'value': 'Τιμή',
    'kind': 'Είδος',
    'resource': 'Πόρος',
    'children': 'CA-παιδιά',
    'handle': 'Ονομασία',
    // TODO: translate
    'comment': 'Comment',
    'maxLength': 'Μέγιστο μήκος',
    'maxLengthTooltip': 'Εάν το μέγιστο μήκος δεν οριστεί (-), το μήκος του προθέματος προεπιλέγεται ως το μέγιστο μήκος.',
    'confirmation': {
      'title': 'Προειδοποίηση',
      'message': 'Αυτή η ενέργεια θα αφαιρέσει το ROA \'{prefix}-{max_length} => {asn}\'. Συνέχεια;',
      'added': 'Το ROA προστέθηκε',
      'retired': 'Το ROA αφαιρέθηκε',
      'retiredSuccess': 'Το ROA έχει αφαιρεθεί',
      'addedSuccess': 'Το ROA έχει προστεθεί',
      // TODO translate
      'commentUpdatedSuccess': 'The ROA comment has been updated',
    },
    'addROAForm': {
      'required': 'Το πεδίο είναι υποχρεωτικό',
      'asn_format': 'Το ASN δεν είναι έγκυρο',
      'prefix_format': 'Παρακαλώ εισάγετε ένα έγκυρο IPv4 ή IPv6 πρόθεμα'
    },
    'onboardingWarning': 'Θα χρειαστεί να συνδέσετε την Αρχή Πιστοποίησής (CA) σας σε ένα δημόσιο αποθετήριο (repository) RPKI που θα μπορεί να δημοσιεύσει το πιστοποιητικό και τα ROA σας. Με το που ολοκληρωθεί η ρύθμιση του CA-πατέρα, λογισμικά επικύρωσης (relying party) θα αρχίσουν να ανακτούν το πιστοποιητικό και τα ROA σας από αυτό το αποθετήριο (repository).',
    // TODO translate
    'initializeRepository': 'You still need to configure a repository for your CA before it can request resource certificate(s) from its parent(s)',
    'initialize': 'Παρακαλώ αρχικοποιήστε ένα αποθετήριο (repository) RPKI και/ή τον CA-γονέα πρώτα.',
    'noResourcesYet': 'Δεν έχετε λάβει κανέναν πόρο ακόμα',
    'clickToRefresh': 'Κάντε κλίκ εδώ για ανανέωση',
    'parentsTab': {
      'request': 'Αίτημα CA-παιδιού',
      'response': 'Απάντηση CA-γονέα',
      'addParent': 'Προσθήκη επιπλέον CA-γονέα',
      'addParentSuccess': 'Ο CA-γονέας προστέθηκε',
      'name': 'Όνομα CA-γονέα',
      'namerequired': 'Το όνομα CA-γονέα είναι υποχρεωτικό',
      'nameformat': 'Το όνομα CA-γονέα δεν είναι έγκυρο'
    },
    'repoTab': {
      'request': 'Αίτημα Εκδότη',
      'response': 'Απάντηση Αποθετηρίου (Repository)',
      // TODO translate
      'addRepo': 'Add a repository',
      'addRepoSuccess': 'Το Αποθετήριο (Repository) προστέθηκε'
    },
    'analyseThis': 'Ανέλυσε τα ROA',
    'analysis': 'Ανάλυση ROA',
    'suggestions': {
      'following': 'Παρακαλώ επαληθεύστε τις ακόλουθες προτεινόμενες αλλαγές στα ROA σας.',
      'readMore': 'Διαβάστε περισσότερα...',
      'nochanges': 'Δεν προτείνουμε αλλαγές αυτή τη στιγμή',
      'adding': 'Προσθήκη',
      'removing': 'Αφαίρεση ROA',
      'keep': 'Κρατήστε την κατάσταση ως έχει',
      'willResult': 'Θα έχει ως αποτέλεσμα',
      'yourChoice': 'Επιλογή σας',
      'ourSuggestion': 'Η πρότασή μας',
      'ourSuggestionHelp': 'Η πρότασή μας βασίζεται στις πληροφορίες του RIPE RIS Routing, παρακαλώ επιβεβαιώστε!',
      'addThis': 'Προσθέστε αυτό',
      'removeThis': 'Αφαιρέστε αυτό',
      'willAdd': 'Πρόσθεση αυτού του ROA',
      'willRemove': 'Αφαίρεση αυτού του ROA',
      'reasons': {
        'not_found': 'Δεν βρέθηκε',
        'not_held': 'Το ROA δεν μπορεί να δημοσιευθεί, το αντίστοιχο πρόθεμα δεν είναι πλέον μέρος κανενός πιστοποιητικού σας',
        'invalid_asn': 'Άκυρο ASN',
        'invalid_length': 'Άκυρο μήκος',
        'stale': 'Δεν υπάρχουν ορατές ανακοινώσεις για το ROA',
        'disallowing': 'Αυτό το ROA μόνο απαγορεύει ανακοινώσεις. Αν αυτό είναι σκόπιμο μπορείτε να χρησιμοποιήσετε ένα AS0 ROA αντί αυτού.',
        'as0_redundant': 'Περιττό ROA',
        'redundant': 'Περιττό ROA',
        'too_permissive': 'Το ROA επιτρέπει επιπλέον ανακοινώσεις που μπορεί να καταχραστούν για επιθέσεις τύπου path spoofing hijacks',
        'specific': 'Επιτρέψτε συγκεκριμένη ανακοίνωση σε ένα ROA που μπορεί να είναι πολύ επιτρεπτικό',
        'new': 'Νέο'
      }
    },
    'syncParents': 'Ανανέωση CA-γονέων',
    'syncRepo': 'Ανανέωση Αποθετηρίου (Repository)',
    'lastExchange': 'Τελευταία ανταλλαγή',
    'exchangeUri': 'URI',
    'nextExchange': 'Επόμενη ανταλλαγή πρίν από',
    'allResources': 'Όλοι οι πόροι',
    'entitlements': 'Δικαιοδοσίες',
    'showEntitlements': 'Εμφάνιση Λεπτομερών Δικαιοδοσιών',
    'parentCertificate': 'Πιστοποιητικό CA-γονέα',
    'published': 'Δημοσιευμένο'
  },
  'announcements': {
    'noRoasOrAnnouncements': 'Δεν βρέθηκαν ROA ή Ανακοινώσεις.',
    'search': 'Αναζήτηση για ASN, πρόθεμα, κατάσταση...',
    'authorizes': 'Εξουσιοδοτεί {number} ανακοινώσεις',
    'disallows': 'Απαγορεύει {number} ανακοινώσεις',
    'asn': 'ASN',
    'prefix': 'Πρόθεμα',
    'stateLabel': 'Κατάσταση',
    'state': {
      'roa_seen': 'ΟΡΑΤΟ',
      'roa_seen_help': 'Υπάρχουν ταιριαστές ανακοινώσεις στο BGP για αυτό το ROA',
      'roa_unseen': 'ΑΦΑΝΕΣ',
      'roa_unseen_help': 'Δεν βλέπουμε καμμία BGP ανακοίνωση που να ταιριάζει με αυτό το ROA',
      'roa_not_held': 'ΑΦΑΙΡΕΜΕΝΟ ΠΡΟΘΕΜΑ',
      'roa_not_held_help': 'Το πρόθεμα δεν είναι πλέον μέρος κανενός πιστοποιητικού σας, το ROA δεν θα δημοσιευθεί',
      'roa_no_announcement_info': 'ΚΑΜΜΙΑ ΠΛΗΡΟΦΟΡΙΑ ΑΝΑΚΟΙΝΩΣΗΣ',
      'roa_too_permissive': 'ΠΟΛΥ ΕΠΙΤΡΕΠΤΙΚΟ',
      'roa_too_permissive_help': 'Αυτό το ROA ταιριάζει με ανακοινώσεις στο BGP, αλλά επίσης επιτρέπει αφανείς ανακοινώσεις',
      'roa_disallowing': 'ΑΠΑΓΟΡΕΥΤΙΚΟ',
      'roa_disallowing_help': 'Αυτό το ROA μόνο απαγορεύει ανακοινώσεις. Αν αυτό είναι σκόπιμο μπορείτε να χρησιμοποιήσετε ένα AS0 ROA αντί αυτού.',
      'roa_redundant': 'ΠΕΡΙΤΤΟ',
      'roa_redundant_help': 'Αυτό το ROA είναι περιττό καθώς υπάρχουν ένα ή περισσότερα ROA που καλύπτουν το πρόθεμα, μήκος και ASN',
      'roa_as0': 'AS0',
      'roa_as0_help': 'Αυτό το ROA χρησιμεύει για να αποτρέπει όλες τις ανακοινώσεις για ένα πρόθεμα',
      'roa_as0_redundant': 'ΠΕΡΙΤΤΟ',
      'roa_as0_redundant_help': 'Αυτό το AS0 ROA είναι περιττό καθώς υπάρχουν ένα ή περισσότερα ROA που καλύπτουν το πρόθεμα',
      'announcement_not_found': 'ΔΕΝ ΒΡΕΘΗΚΕ',
      'announcement_not_found_help': 'Αυτή η ανακοίνωση δεν καλύπτεται από κανένα ROA σας',
      'announcement_invalid_length': 'ΑΚΥΡΟ ΜΗΚΟΣ',
      'announcement_invalid_length_help': 'Αυτή η ανακοίνωση δεν είναι επιτρεπτή καθώς είναι πιο συγκεκριμένη από το πρόθεμα και το μέγιστο μήκος που έχετε εξουσιοδοτήσει για αυτό το ASN',
      'announcement_invalid_asn': 'ΑΚΥΡΟ ASN',
      'announcement_invalid_asn_help': 'Αυτή η ανακοίνωση δεν είναι επιτρεπτή καθώς έχετε εξουσιοδοτήσει το πρόθεμα μόνο από άλλο ASN'
    },
    'download': 'Λήψη CSV'
  },
  'deltaErrors': {
    'duplicates': 'Διπλότυπα',
    'covered': 'Καλύπτεται',
    'notheld': 'Δεν Κατέχεται',
    'unknowns': 'Άγνωστα',
    'invalid_length': 'Άκυρο Μήκος',
    'covering': 'Καλύπτει',
    'as0_exists': 'Το AS0 Υπάρχει',
    'as0_overlaps': 'Το AS0 Υπερκαλύπτει'
  },
  'errors': {
    'repo_not_set': 'Πρώτα πρέπει να ρυθμιστεί ένα αποθετήριο (repository)',
    'pub_unknown': 'Ο εκδότης \'{publisher}\' είναι άγνωστος',
    'pub_duplicate': 'Ο εκδότης \'{publisher}\' έχει ήδη αρχικοποιηθεί',
    'pub_outside_jail': 'Το URI \'{uri}\' του εκδότη είναι εκτός του URI \'{sia_base}\' του αποθετηρίου (repository)',
    'pub_uri_no_slash': 'Το URI \'{uri}\' του εκδότη πρέπει να τελειώνει με \'/\'',
    'pub_no_embedded_repo': 'Δεν έχει ρυθμιστεί ενσωματωμένο αποθετήριο (repository)',
    'ca_duplicate': 'Η Αρχή Πιστοποίησης (CA) \'{ca}\' έχει ήδη αρχικοποιηθεί',
    'ca_unknown': 'Η Αρχή Πιστοποίησης (CA) \'{ca}\' είναι άγνωστη',
    'ca_repo_same': 'Αυτό το αποθετήριο (repository) χρησιμοποιείται ήδη',
    'ca_repo_issue': 'Μήνυμα σφάλματος απο αποθετήριο (repository): {cause}',
    'ca_repo_response_invalid_xml': 'Άκυρη απάντηση XML από το αποθετήριο (repository)',
    'ca_repo_response_wrong_xml': 'Λήφθηκε απάντηση CA-γονέα αντί για απάντηση αποθετηρίου (repository)',
    'ca_parent_duplicate': 'Έχετε ήδη έναν CA-γονέα με το όνομα \'{parent}\'',
    'ca_parent_xml_duplicate': 'Αυτή η απάντηση χρησιμοποιείται ήδη από έναν CA-γονέα με όνομα \'{parent}\'',
    'ca_parent_unknown': 'Δεν έχετε CA-γονέα με το όνομα \'{parent}\'',
    'ca_parent_issue': 'Μήνυμα σφάλματος από CA-γονέα \'{parent}\': {cause}',
    'ca_parent_response_invalid_xml': 'Άκυρη απάντηση XML από CA-γονέα',
    'ca_parent_response_wrong_xml': 'Λήφθηκε απάντηση αποθετηρίου (repository) ενώ προστιθόταν CA-γονέας',
    'ca_child_duplicate': 'Έχετε ήδη ένα CA-παιδί με το όνομα \'{child}\'',
    'ca_child_unknown': 'Δέν έχετε CA-παιδί με το όνομα \'{child}\'',
    'ca_child_resources_required': 'Πρέπει να προσδιορίσετε πόρους για το CA-παιδί \'{child}\'',
    'ca_roa_unknown': 'Δεν είναι δυνατή η αφαίρεση άγνωστου ROA \'{prefix}-{max_length} => {asn}\'',
    'ca_roa_duplicate': 'Διπλότυπο ROA \'{prefix}-{max_length} => {asn}\'',
    'ca_roa_invalid_max_length': 'Μη έγκυρο μέγιστο μήκος στο ROA \'{prefix}-{max_length} => {asn}\'',
    'ca_roa_not_entitled': 'Το πρόθεμα ROA \'{prefix}\' δεν είναι σε κανένα από τα τρέχοντα πιστοποιητικά σας',
    'ta_not_allowed': 'Αυτή η λειτουργικότητα δεν υποστηρίζεται από τη δοκιμαστική Άγκυρα Εμπιστοσύνης (Trust Anchor)',
    'ta_name_reserved': 'Κατοχυρωμένο όνομα',
    'ca_roa_delta_error': 'Το ROA απορρίφθηκε για τους ακόλουθους λόγους',
    'api_insufficient_rights': 'Ο χρήστης σας δεν έχει επαρκή δικαιώματα για να εκτελέσει αυτή την ενέργεια. Παρακαλώ επικοινωνείστε με το διαχειριστή σας.',
    'api_invalid_credentials': 'Τα παρεχόμενα στοιχεία σύνδεσης είναι λάθος.',
    'api_login_error': 'Προέκυψε σφάλμα κατά τη σύνδεση: {cause}',
    'api_auth_transient_error': 'Προέκυψε (προσωρινό) σφάλμα κατά τη διαδικασία πιστοποίησης της αίτησης. Παρακαλώ προσπαθήστε αργότερα.',
    'api_auth_permanent_error': 'Προέκυψε σφάλμα κατά τη διαδικασία πιστοποίησης της αίτησης. Παρακαλώ επικοινωνείστε με το διαχειριστή σας.',
    'api_auth_session_expired': 'Η συνεδρία σας έχει λήξει. Παρακαλώ συνδεθείτε ξανά...',
    'general_error': 'Κάτι πήγε λάθος. Παρακαλώ επικοινωνείστε με το διαχειριστή σας.'
  },
  'testbed': {
    'welcome': 'Καλωσήρθατε σε αυτή την πλατφόρμα δοκιμών RPKI',
    'disclaimer': {
      'heading': 'Αποποίηση Ευθύνης',
      'body': 'Αυτή η πλατφόρμα δοκιμών προσφέρει μία εντελώς ανεξάρτητη RPKI ιεραρχία που μπορεί να χρησιμοποιηθεί για σκοπούς αξιολόγησης. Επιτρέπει την εγγραφή οποιουδήποτε πόρου για το CA-παιδί σας. Δεν παρέχονται εγγυήσεις όσον αφορά την διαθεσιμότητα αυτής της υπηρεσίας. Για τυχόν προβλήματα, <a href=\'https://github.com/NLnetLabs/krill/issues/new\'>παρακαλείσθε να μας ενημερώσετε</a>.'
    },
    'rpconfighelp': {
      'heading': 'TAL για την πλατφόρμα δοκιμών',
      'body': 'Για να ανακτείσετε τα δεδομένα που εκδίδονται από αυτή την πλατφόρμα δοκιμών, παρακαλείσθε να κατεβάσετε αυτόν τον <a href=\'{tallink}\'>Εντοπιστή Άγκυρας Εμπιστοσύνης</a> (TAL) και να τον ρυθμίσετε στο λογισμικό επικύρωσής (Relying Party Software) σας. Σημειώστε ότι ΟΥΔΕΠΟΤΕ δεν πρέπει να χρησιμοποιήσετε αυτό το TAL σε περιβάλλον παραγωγής. Η χρήση του παρέχεται μόνο για δοκιμές.'
    },
    'regunreg': {
      'heading': 'Εγγραφή/Διαγραφή',
      'body': '<p>Χρησιμοποιήστε τη φόρμα για την εγγραφή της δικής σας Αρχής Πιστοποίησης RPKI ως CA-παιδιού της πλατφόρμας δοκιμών για τη δημιουργία ROA για τους πόρους που κατέχετε.</p><p>Εάν δεν επιθυμείτε να φιλοξενήσετε τα δικά σας Rsync και RRDP αποθετήρια (repositories) μπορείτε να χρησιμοποιήσετε τη φόρμα Εγγραφής Εκδότη για να ρυθμίσετε την έκδοση των ROA σας στο αποθετήριο (respository) που παρέχεται από την πλατφόρμα δοκιμών. Χρησιμοποιήστε τις φόρμες Διαγραφής για να ακυρώσετε προηγούμενες σχέσεις (ακόμα και σχέσεις από άλλους χρήστες της πλατφόρμας δοκιμών!).</p>'
    },
    'rfcdoclink': 'Κάντε κλίκ για να δείτε το RFC-8183 έγγραφο για αυτό το XML',
    'childhandle': 'Ονομασία CA-παιδιού',
    'publisherhandle': 'Ονομασία Εκδότη',
    'responseXML': 'Απάντηση XML της πλατφόρμας δοκιμών',
    'addChild': {
      'heading': 'Εγγραφή Αρχής Πιστοποίησης (CA)',
      'requestXML': {
        'label': 'Αίτημα XML CA-παιδιού',
        'placeholder': 'Επικολλήστε το XML <child_request/> εδώ'
      },
      'asnresources': {
        'label': 'Πόροι ASN',
        'placeholder': 'Οι AS πόροι: π.χ. AS1, AS3-4'
      },
      'ipv4resources': {
        'label': 'Πόροι IPv4',
        'placeholder': 'Οι IPv4 πόροι: π.χ. 192.168.0.0/16'
      },
      'ipv6resources': {
        'label': 'Πόροι IPv6',
        'placeholder': 'Οι IPv6 πόροι: π.χ. 2001:db8::/32'
      },
      'confirm': 'Εγγραφή CA-παιδιού',
      'format': 'Μη έγκυρο αίτημα XML CA-παιδού',
      'required': 'Παρακαλώ παραχωρήστε το αίτημα XML CA-παιδιού',
      'confirmation': {
        'title': 'Προειδοποίηση',
        'message': 'Είστε σίγουροι ότι επιθυμείτε την εγγραφή αυτού του CA-παιδιού με την πλατφόρμα δοκιμών;'
      },
      'success': 'Το CA-παιδί \'{child_handle}\' προστέθηκε στην πλατφόρμα δοκιμών.',
      'registeranother': 'Εγγραφή άλλης Αρχής Πιστοποίησης (CA)'
    },
    'removeChild': {
      'heading': 'Διαγραφή Αρχής Πιστοποίησης (CA)',
      'placeholder': 'Εισάγετε το όνομα της Αρχής Πιστοποίησης (CA) προς αφαίρεση',
      'confirm': 'Αφαίρεση CA-παιδιού',
      'confirmation': {
        'title': 'Προειδοποίηση',
        'message': 'Είστε σίγουροι ότι επιθυμείτε την διαγραφή αυτού του CA-παιδιού από την πλατφόρμα δοκιμών;'
      },
      'success': 'Το CA-παιδί \'{child_handle}\' αφαιρέθηκε από την πλατφόρμα δοκιμών.'
    },
    'addPublisher': {
      'heading': 'Εγγραφή Εκδότη',
      'requestXML': {
        'label': 'Αίτημα XML Εκδότη',
        'placeholder': 'Επικολλήστε το XML <publisher_request/> εδώ'
      },
      'confirm': 'Εγγραφή Εκδότη',
      'format': 'Μη έγκυρο αίτημα XML Εκδότη',
      'required': 'Παρακαλώ παραχωρήστε το αίτημα XML Εκδότη',
      'confirmation': {
        'title': 'Προειδοποίηση',
        'message': 'Είστε σίγουροι ότι επιθυμείτε την εγγραφή αυτού του Εκδότη με την πλατφόρμα δοκιμών;'
      },
      'success': 'Ο Εκδότης \'{publisher_handle}\' προστέθηκε στην πλατφόρμα δοκιμών.',
      'registeranother': 'Εγγραφή άλλου Εκδότη'
    },
    'removePublisher': {
      'heading': 'Διαγραφή Εκδότη',
      'placeholder': 'Εισάγετε το όνομα Εκδότη προς αφαίρεση',
      'confirm': 'Αφαίρεση Εκδότη',
      'confirmation': {
        'title': 'Προειδοποίηση',
        'message': 'Είστε σίγουροι ότι επιθυμείτε την διαγραφή αυτού του Εκδότη από την πλατφόρμα δοκιμών;'
      },
      'success': 'Ο Εκδότης \'{publisher_handle}\' αφαιρέθηκε από την πλατφόρμα δοκιμών.'
    },
    'errors': {
      'invalid_xml': 'Άκυρο XML: {err}',
      'missing_xml_el': 'Έλλειψη στοιχείου {el}',
      'missing_xml_child_el': 'Έλλειψη υποστοιχείου {el} του στοιχείου {parent}',
      'missing_xml_attr': 'Έλλειψη χαρακτηριστικού {attr} στο στοιχείο {el}',
      'empty_xml_el': 'Το στοιχείο {el} δεν μπορεί να είναι άδειο',
      'empty_xml_attr': 'Το χαρακτηριστικό {attr} στο στοιχείο {el} δεν μπορεί να είναι άδειο',
      'non_ascii_xml_el': 'Το στοιχείο {el} δεν μπορεί να περιέχει χαρακτήρες που δεν είναι ASCII',
      'child_handle_required': 'Η ονομασία CA-παιδιού είναι υποχρεωτική',
      'publisher_handle_required': 'Η ονομασία Εκδότη είναι υποχρεωτική',
      'non_base64_certificate_xml_el': 'Το στοιχείο {el} πρέπει να περιέχει ένα σωστά κωδικοποιημένο σε Base64 αυτο-υπογεγραμμένο X.509 BPKI πιστοποιητικό',
      'invalid_registration_data': 'Τα στοιχεία εγγραφής σας δεν μπόρεσαν να αναλυθούν σωστά'
    }
  }
};
