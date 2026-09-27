import { useEffect, useRef, useState } from 'react'
import {
  Activity, ArrowLeft, ArrowRight, AudioLines, BadgeCheck, Check, CheckCircle2,
  ChevronDown, CircleAlert, ClipboardList, Clock3, FileText, Headphones,
  HeartHandshake, Home, Languages, LockKeyhole, MessageSquareText, Mic, Plus,
  Search, Shield, ShieldAlert, ShieldCheck, Siren, UserRoundCheck, UsersRound, X,
} from 'lucide-react'
import './App.css'

const STORAGE_KEY = 'sahay-cases-v1'
const LANGUAGE_KEY = 'sahay-language-v1'

const copy = {
  en: {
    brandSubtitle: 'Trauma-Aware Complaint Support', publicService: 'PUBLIC SERVICE PROTOTYPE', navHome: 'Home', officerDashboard: 'Officer dashboard', language: 'Language',
    startAssessment: 'Start assessment', back: 'Back', continue: 'Continue', homeEyebrow: 'A safer first step starts here', homeTitle: 'You deserve to be heard, at your own pace.',
    homeIntro: 'Reaching out can feel difficult, especially when you are worried about your safety or unsure what to say. SAHAY offers a calm, private first step and helps a human responder understand what support may help.',
    privateFirst: 'Private by design', privateText: 'Your responses stay in this browser demo. You choose what to share.', humanLed: 'Human-led support', humanText: 'An officer or counsellor reviews recommendations and decides what happens next.',
    whatToExpect: 'A gentle, guided check-in', expectText: 'Five short questions. Your story is optional. You can stop at any time.', timeEstimate: 'About 2 minutes', confidential: 'Confidentiality notice',
    confText: 'This demonstration stores submitted information only in this browser’s local storage. It is not connected to a live authority or service.', howTitle: 'How SAHAY works', howLead: 'A clear path from first contact to human support.',
    flowInput: 'First contact', flowConsent: 'Your consent', flowResponses: 'Guided responses', flowIndicators: 'Possible indicators', flowScore: 'Demo SVI', flowRisk: 'Risk category', flowSupport: 'Support options', flowHuman: 'Human decision',
    flowInputSub: 'Portal, phone or in person', flowConsentSub: 'You remain in control', flowResponsesSub: 'Text, voice or choices', flowIndicatorsSub: 'Signals, not conclusions', flowScoreSub: 'Transparent prototype score', flowRiskSub: 'Low to critical', flowSupportSub: 'Suggestions for review', flowHumanSub: 'Officer decides next steps',
    privacyTitle: 'Your information, handled with care', privacyCopy: 'SAHAY uses only the information you choose to share for this assessment. It is an assistance tool, not a clinical diagnosis. A trained person makes every support decision.', dataMin: 'Data minimization', humanLoop: 'Human in the loop', notDiagnosis: 'Not a medical diagnosis',
    consentTitle: 'Before we begin', consentIntro: 'This short check-in helps a human responder understand how you are feeling and what kind of support may be useful right now.', consentWhy: 'Why we ask',
    consentWhyText: 'Your answers and any optional story can help identify possible distress or safety concerns so an officer can prioritize a supportive response.', consentPrivacy: 'Your privacy', consentPrivacyText: 'For this prototype, information is saved only on this device in this browser. Share only what feels comfortable. You may stop at any time.',
    consentTool: 'An assistance tool', consentToolText: 'A prototype score is not a diagnosis or a final risk decision. A human officer or counsellor reviews the information and decides what to do.', consentCheck: 'I understand and consent to continue', consentRequired: 'Please confirm your consent to continue.',
    assessmentTitle: 'Your check-in', assessmentIntro: 'There are no right or wrong answers. Share only what feels comfortable.', step: 'Step', of: 'of', optional: 'Optional', required: 'Required',
    questionFeeling: 'How are you feeling right now?', questionSafety: 'Do you currently feel unsafe or threatened?', questionExplain: 'How difficult is it for you to explain what happened?', questionSupport: 'Do you feel isolated or without support?', questionStory: 'Would you like to tell us anything about what happened?',
    optCalm: 'Calm', optWorried: 'Worried', optAnxious: 'Very anxious', optDistressed: 'Extremely distressed', optNo: 'No', optALittle: 'A little', optYes: 'Yes', optImmediate: 'Immediate danger',
    optEasy: 'Easy', optSomewhat: 'Somewhat difficult', optVeryDifficult: 'Very difficult', optCannotExplain: 'I cannot explain it right now', optSometimes: 'Sometimes', optOften: 'Often', optIsolated: 'Completely isolated',
    storyPlaceholder: 'Write as much or as little as you like. You can leave this blank.', voiceInput: 'Speak your response', voiceListening: 'Listening… select to stop', voiceUnsupported: 'Voice input is not available in this browser.',
    nextStep: 'Next', previousStep: 'Previous', submitAssessment: 'See my support summary', resultEyebrow: 'Your support summary', resultTitle: 'Thank you for sharing what you can.', resultIntro: 'This prototype summary is a starting point for a human conversation, not a decision about you.',
    sviLabel: 'Stress Vulnerability Index', riskLabel: 'Risk category', detectedTitle: 'Possible indicators', whyDetected: 'Why these indicators appeared', indicatorHighAnxiety: 'High anxiety', indicatorSafety: 'Safety concern', indicatorDifficulty: 'Difficulty communicating', indicatorIsolation: 'Social isolation', indicatorFear: 'Fear expressed', indicatorThreat: 'Threat mentioned', indicatorDistress: 'Emotional distress',
    reasonHighAnxiety: 'You described feeling very anxious or extremely distressed.', reasonSafety: 'You indicated some level of feeling unsafe or threatened.', reasonDifficulty: 'You said explaining what happened is difficult right now.', reasonIsolation: 'You described feeling alone or without support.', reasonFear: 'Your optional story included language about fear.', reasonThreat: 'Your optional story mentioned a threat.', reasonDistress: 'Your responses or story included signs of emotional distress.',
    riskLow: 'LOW', riskModerate: 'MODERATE', riskHigh: 'HIGH', riskCritical: 'CRITICAL', prototypeNotice: 'Prototype AI-assisted assessment — not a clinical diagnosis.', scoreMethod: 'Demo score based on your selected responses and optional story indicators. This heuristic is not clinically validated.', supportTitle: 'Suggested support for a human to review',
    supportLow1: 'General information', supportLow2: 'Follow-up support', supportModerate1: 'Counsellor follow-up', supportModerate2: 'Legal information', supportHigh1: 'Priority human review', supportHigh2: 'Counsellor support', supportHigh3: 'Legal assistance', supportHigh4: 'Safety assessment',
    supportCritical1: 'Immediate human review', supportCritical2: 'Emergency or safety support', supportCritical3: 'Counsellor support', supportCritical4: 'Appropriate authorities, if required', humanConfirm: 'Any contact with authorities or emergency services requires human confirmation. SAHAY does not contact them automatically.',
    returnHome: 'Return home', viewDashboard: 'View officer dashboard', caseSaved: 'Your assessment has been saved in this browser.', dashboardEyebrow: 'NHAA · SUPPORT OPERATIONS', dashboardTitle: 'Officer dashboard', dashboardIntro: 'Review cases, identify urgent needs and coordinate a human response.',
    totalCases: 'Total cases', lowCases: 'Low risk', moderateCases: 'Moderate risk', highCases: 'High risk', criticalCases: 'Critical risk', immediateReview: 'Immediate review', distributionTitle: 'Case distribution', distributionCaption: 'Cases by prototype risk category', recentCases: 'Case records',
    searchCases: 'Search case ID or indicator', allRisks: 'All risk levels', allStatuses: 'All statuses', colCaseId: 'Case ID', colDate: 'Date received', colLanguage: 'Language', colSVI: 'SVI', colRisk: 'Risk', colIndicators: 'Key indicators', colSupport: 'Suggested support', colStatus: 'Status', colAction: 'Action', viewCase: 'View case', noCases: 'No cases match these filters.',
    statusNew: 'New', statusReview: 'In review', statusResolved: 'Resolved', caseDetails: 'Case details', caseNotFound: 'This case could not be found.', backDashboard: 'Back to dashboard', caseAssessment: 'Assessment responses', complaintStory: 'Optional story', noStory: 'No story provided.', consentStatus: 'Consent status', consentGiven: 'Consent recorded', timestamp: 'Submitted', recommendations: 'Suggested support', officerActions: 'Officer actions',
    assignCounsellor: 'Assign counsellor', counsellorAssigned: 'Counsellor assigned', requestLegal: 'Request legal review', legalRequested: 'Legal review requested', markUrgent: 'Mark for urgent human review', urgentMarked: 'Urgent review marked', addNote: 'Add officer note', notePlaceholder: 'Enter an internal note…', saveNote: 'Save note', notesTitle: 'Officer notes', noNotes: 'No notes added yet.', updateStatus: 'Update case status', saveStatus: 'Save status', statusSaved: 'Case status updated.', actionSaved: 'Officer action saved.', noteSaved: 'Officer note saved.',
    langEnglish: 'English', langTamil: 'Tamil', languageEnglish: 'English', languageTamil: 'Tamil', indicatorFearShort: 'Fear', indicatorThreatShort: 'Threat', indicatorSafetyShort: 'Safety concern', indicatorAnxietyShort: 'Anxiety', indicatorIsolationShort: 'Isolation', indicatorCommunicationShort: 'Communication difficulty', dateToday: 'Today', listeningStarted: 'Voice input started.', listeningError: 'Voice input could not start. Please type your response.', footerText: 'SAHAY is a public-service prototype for demonstration only.', footerDisclaimer: 'Not a clinical tool · Human review required',
  },
  ta: {
    brandSubtitle: 'அதிர்ச்சி உணர்வுடன் புகார் ஆதரவு', publicService: 'பொதுச் சேவை முன்மாதிரி', navHome: 'முகப்பு', officerDashboard: 'அலுவலர் பலகை', language: 'மொழி', startAssessment: 'மதிப்பீட்டைத் தொடங்குக', back: 'பின்னால்', continue: 'தொடர்க',
    homeEyebrow: 'பாதுகாப்பான முதல் படி இங்கே தொடங்குகிறது', homeTitle: 'உங்கள் வேகத்தில், உங்கள் குரல் கேட்கப்பட வேண்டும்.', homeIntro: 'உதவி கேட்பது கடினமாக இருக்கலாம்; குறிப்பாக உங்கள் பாதுகாப்பைப் பற்றிக் கவலைப்படும்போது அல்லது என்ன சொல்வது என்று தெரியாதபோது. அமைதியான, தனிப்பட்ட முதல் படியாக SAHAY உதவுகிறது; எந்த ஆதரவு உதவக்கூடும் என்பதை மனிதப் பதிலளிப்பவர் புரிந்துகொள்ள வழிவகுக்கிறது.',
    privateFirst: 'தனியுரிமை முதன்மை', privateText: 'இந்த உலாவி முன்மாதிரியிலேயே உங்கள் பதில்கள் இருக்கும். எதைப் பகிர்வது என்பதை நீங்களே தேர்வு செய்கிறீர்கள்.', humanLed: 'மனிதர் வழிநடத்தும் ஆதரவு', humanText: 'பரிந்துரைகளை அலுவலர் அல்லது ஆலோசகர் மதிப்பாய்வு செய்து, அடுத்த நடவடிக்கையைத் தீர்மானிப்பார்.', whatToExpect: 'எளிய வழிகாட்டும் உரையாடல்', expectText: 'ஐந்து சிறிய கேள்விகள். உங்கள் அனுபவத்தைப் பகிர்வது விருப்பமானது. எந்த நேரத்திலும் நிறுத்தலாம்.',
    timeEstimate: 'சுமார் 2 நிமிடங்கள்', confidential: 'ரகசியத்தன்மை அறிவிப்பு', confText: 'இந்தக் காட்சிமாதிரி சமர்ப்பிக்கப்பட்ட தகவலை இந்த உலாவியின் உள்ளக சேமிப்பகத்தில் மட்டுமே வைக்கிறது. இது எந்த நேரடி அதிகார அமைப்புடனும் சேவையுடனும் இணைக்கப்படவில்லை.', howTitle: 'SAHAY எவ்வாறு செயல்படுகிறது', howLead: 'முதல் தொடர்பிலிருந்து மனித ஆதரவு வரை தெளிவான பாதை.',
    flowInput: 'முதல் தொடர்பு', flowConsent: 'உங்கள் ஒப்புதல்', flowResponses: 'வழிகாட்டும் பதில்கள்', flowIndicators: 'சாத்தியமான அறிகுறிகள்', flowScore: 'முன்மாதிரி பாதிப்புக் குறியீடு', flowRisk: 'ஆபத்து வகை', flowSupport: 'ஆதரவு விருப்பங்கள்', flowHuman: 'மனிதரின் முடிவு', flowInputSub: 'இணையதளம், தொலைபேசி அல்லது நேரில்', flowConsentSub: 'கட்டுப்பாடு உங்களிடமே', flowResponsesSub: 'உரை, குரல் அல்லது தேர்வுகள்', flowIndicatorsSub: 'குறிப்புகள் மட்டுமே; முடிவுகள் அல்ல', flowScoreSub: 'வெளிப்படையான முன்மாதிரி மதிப்பெண்', flowRiskSub: 'குறைந்தது முதல் மிகக் கடுமை வரை', flowSupportSub: 'மதிப்பாய்வுக்கான பரிந்துரைகள்', flowHumanSub: 'அடுத்த நடவடிக்கையை அலுவலர் தீர்மானிப்பார்',
    privacyTitle: 'உங்கள் தகவல் கவனத்துடன் கையாளப்படும்', privacyCopy: 'இந்த மதிப்பீட்டிற்காக நீங்கள் பகிரத் தேர்வு செய்யும் தகவலை மட்டுமே SAHAY பயன்படுத்துகிறது. இது உதவிக் கருவி; மருத்துவ நோயறிதல் அல்ல. ஒவ்வொரு ஆதரவு முடிவையும் பயிற்சி பெற்ற மனிதரே எடுப்பார்.', dataMin: 'குறைந்தபட்சத் தரவு', humanLoop: 'மனித மதிப்பாய்வு', notDiagnosis: 'மருத்துவ நோயறிதல் அல்ல',
    consentTitle: 'தொடங்கும் முன்', consentIntro: 'உங்கள் தற்போதைய உணர்வையும் இப்போது உதவக்கூடிய ஆதரவையும் மனிதப் பதிலளிப்பவர் புரிந்துகொள்ள இந்தச் சிறிய உரையாடல் உதவும்.', consentWhy: 'ஏன் கேட்கிறோம்', consentWhyText: 'உங்கள் பதில்களும் விருப்பமாகப் பகிரும் அனுபவமும் சாத்தியமான மனஅழுத்தம் அல்லது பாதுகாப்புக் கவலைகளை அடையாளம் காண உதவும்; இதனால் அலுவலர் ஆதரவான பதிலை முன்னுரிமைப்படுத்தலாம்.', consentPrivacy: 'உங்கள் தனியுரிமை', consentPrivacyText: 'இந்த முன்மாதிரியில் தகவல் இந்தச் சாதனத்தின் உலாவியில் மட்டுமே சேமிக்கப்படும். உங்களுக்கு வசதியானதை மட்டுமே பகிருங்கள். எந்த நேரத்திலும் நிறுத்தலாம்.',
    consentTool: 'இது ஓர் உதவிக் கருவி', consentToolText: 'முன்மாதிரி மதிப்பெண் நோயறிதலோ இறுதி ஆபத்து முடிவோ அல்ல. மனித அலுவலர் அல்லது ஆலோசகர் தகவலை மதிப்பாய்வு செய்து நடவடிக்கையைத் தீர்மானிப்பார்.', consentCheck: 'புரிந்துகொண்டு தொடர ஒப்புக்கொள்கிறேன்', consentRequired: 'தொடர உங்கள் ஒப்புதலை உறுதிப்படுத்தவும்.', assessmentTitle: 'உங்கள் நலநிலைப் பகிர்வு', assessmentIntro: 'சரி அல்லது தவறு என்ற பதில் இல்லை. உங்களுக்கு வசதியானதை மட்டுமே பகிருங்கள்.', step: 'படி', of: '/', optional: 'விருப்பமானது', required: 'தேவையானது',
    questionFeeling: 'இப்போது நீங்கள் எப்படி உணர்கிறீர்கள்?', questionSafety: 'தற்போது பாதுகாப்பற்றதாகவோ அச்சுறுத்தப்பட்டதாகவோ உணர்கிறீர்களா?', questionExplain: 'நடந்ததை விளக்குவது உங்களுக்கு எவ்வளவு கடினமாக உள்ளது?', questionSupport: 'தனிமையாகவோ ஆதரவின்றியோ உணர்கிறீர்களா?', questionStory: 'நடந்ததைப் பற்றி ஏதாவது பகிர விரும்புகிறீர்களா?', optCalm: 'அமைதி', optWorried: 'கவலை', optAnxious: 'மிகுந்த பதற்றம்', optDistressed: 'மிகவும் மனஉளைச்சல்', optNo: 'இல்லை', optALittle: 'சிறிதளவு', optYes: 'ஆம்', optImmediate: 'உடனடி ஆபத்து', optEasy: 'எளிது', optSomewhat: 'ஓரளவு கடினம்', optVeryDifficult: 'மிகவும் கடினம்', optCannotExplain: 'இப்போது விளக்க முடியவில்லை', optSometimes: 'சில நேரங்களில்', optOften: 'அடிக்கடி', optIsolated: 'முற்றிலும் தனிமை',
    storyPlaceholder: 'விரும்பிய அளவு மட்டும் எழுதுங்கள். இதை வெறுமையாக விடலாம்.', voiceInput: 'பதிலைப் பேசுங்கள்', voiceListening: 'கேட்கிறது… நிறுத்தத் தேர்ந்தெடுக்கவும்', voiceUnsupported: 'இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை.', nextStep: 'அடுத்து', previousStep: 'முந்தையது', submitAssessment: 'ஆதரவு சுருக்கத்தைப் பார்க்கவும்', resultEyebrow: 'உங்கள் ஆதரவு சுருக்கம்', resultTitle: 'உங்களால் பகிர முடிந்ததைப் பகிர்ந்ததற்கு நன்றி.', resultIntro: 'இந்த முன்மாதிரி சுருக்கம் மனித உரையாடலுக்கான தொடக்கம் மட்டுமே; உங்களைப் பற்றிய முடிவு அல்ல.',
    sviLabel: 'மனஅழுத்தப் பாதிப்பு குறியீடு', riskLabel: 'ஆபத்து வகை', detectedTitle: 'சாத்தியமான அறிகுறிகள்', whyDetected: 'இந்த அறிகுறிகள் காட்டப்பட்டதன் காரணம்', indicatorHighAnxiety: 'அதிகப் பதற்றம்', indicatorSafety: 'பாதுகாப்புக் கவலை', indicatorDifficulty: 'தொடர்புகொள்வதில் சிரமம்', indicatorIsolation: 'சமூகத் தனிமை', indicatorFear: 'வெளிப்படுத்திய பயம்', indicatorThreat: 'அச்சுறுத்தல் குறிப்பிடப்பட்டது', indicatorDistress: 'மனஉளைச்சல்', reasonHighAnxiety: 'மிகுந்த பதற்றம் அல்லது மிகவும் மனஉளைச்சலாக இருப்பதாகக் குறிப்பிட்டீர்கள்.', reasonSafety: 'பாதுகாப்பற்றதாகவோ அச்சுறுத்தப்பட்டதாகவோ ஓரளவு உணர்வதாகக் குறிப்பிட்டீர்கள்.', reasonDifficulty: 'நடந்ததை விளக்குவது இப்போது கடினம் என்று கூறினீர்கள்.', reasonIsolation: 'தனிமையாகவோ ஆதரவின்றியோ இருப்பதாகக் குறிப்பிட்டீர்கள்.', reasonFear: 'விருப்பமாகப் பகிர்ந்த உரையில் பயம் தொடர்பான சொற்கள் இருந்தன.', reasonThreat: 'விருப்பமாகப் பகிர்ந்த உரையில் அச்சுறுத்தல் குறிப்பிடப்பட்டது.', reasonDistress: 'உங்கள் பதில்கள் அல்லது உரையில் மனஉளைச்சலுக்கான அறிகுறிகள் இருந்தன.',
    riskLow: 'குறைவு', riskModerate: 'மிதமானது', riskHigh: 'அதிகம்', riskCritical: 'மிகக் கடுமை', prototypeNotice: 'செயற்கை நுண்ணறிவு உதவியுடனான முன்மாதிரி மதிப்பீடு — மருத்துவ நோயறிதல் அல்ல.', scoreMethod: 'நீங்கள் தேர்ந்தெடுத்த பதில்கள் மற்றும் விருப்ப உரையில் உள்ள அறிகுறிகளின் அடிப்படையிலான முன்மாதிரி மதிப்பெண். இந்த முறை மருத்துவ ரீதியாகச் சரிபார்க்கப்படவில்லை.', supportTitle: 'மனிதர் மதிப்பாய்வு செய்ய வேண்டிய ஆதரவு பரிந்துரைகள்',
    supportLow1: 'பொதுத் தகவல்', supportLow2: 'தொடர்தல் ஆதரவு', supportModerate1: 'ஆலோசகர் தொடர்தல்', supportModerate2: 'சட்டத் தகவல்', supportHigh1: 'முன்னுரிமை மனித மதிப்பாய்வு', supportHigh2: 'ஆலோசகர் ஆதரவு', supportHigh3: 'சட்ட உதவி', supportHigh4: 'பாதுகாப்பு மதிப்பீடு', supportCritical1: 'உடனடி மனித மதிப்பாய்வு', supportCritical2: 'அவசர அல்லது பாதுகாப்பு ஆதரவு', supportCritical3: 'ஆலோசகர் ஆதரவு', supportCritical4: 'தேவைப்பட்டால் உரிய அதிகாரிகள்', humanConfirm: 'அதிகாரிகள் அல்லது அவசர சேவைகளைத் தொடர்புகொள்வதற்கு மனிதரின் உறுதிப்படுத்தல் அவசியம். SAHAY அவர்களைத் தானாகத் தொடர்புகொள்ளாது.',
    returnHome: 'முகப்புக்குத் திரும்புக', viewDashboard: 'அலுவலர் பலகையைப் பார்க்கவும்', caseSaved: 'உங்கள் மதிப்பீடு இந்த உலாவியில் சேமிக்கப்பட்டுள்ளது.', dashboardTitle: 'அலுவலர் பலகை', dashboardIntro: 'வழக்குகளை மதிப்பாய்வு செய்து, அவசரத் தேவைகளைக் கண்டறிந்து, மனித ஆதரவை ஒருங்கிணைக்கவும்.',
    totalCases: 'மொத்த வழக்குகள்', lowCases: 'குறைந்த ஆபத்து', moderateCases: 'மிதமான ஆபத்து', highCases: 'அதிக ஆபத்து', criticalCases: 'மிகக் கடுமையான ஆபத்து', immediateReview: 'உடனடி மதிப்பாய்வு', distributionTitle: 'வழக்குப் பகிர்வு', distributionCaption: 'முன்மாதிரி ஆபத்து வகைப்படி வழக்குகள்', recentCases: 'வழக்குப் பதிவுகள்', searchCases: 'வழக்கு எண் அல்லது அறிகுறியைத் தேடுக', allRisks: 'அனைத்து ஆபத்து வகைகள்', allStatuses: 'அனைத்து நிலைகள்',
    dashboardEyebrow: 'புகார் ஆதரவு · சேவைச் செயல்பாடுகள்', colCaseId: 'வழக்கு எண்', colDate: 'பெறப்பட்ட தேதி', colLanguage: 'மொழி', colSVI: 'குறியீடு', colRisk: 'ஆபத்து', colIndicators: 'முக்கிய அறிகுறிகள்', colSupport: 'பரிந்துரைக்கப்பட்ட ஆதரவு', colStatus: 'நிலை', colAction: 'செயல்', viewCase: 'வழக்கைப் பார்க்கவும்', noCases: 'இந்த வடிகட்டிகளுக்குப் பொருந்தும் வழக்குகள் இல்லை.', statusNew: 'புதியது', statusReview: 'மதிப்பாய்வில்', statusResolved: 'முடிக்கப்பட்டது', caseDetails: 'வழக்கு விவரங்கள்', caseNotFound: 'இந்த வழக்கைக் கண்டறிய முடியவில்லை.', backDashboard: 'பலகைக்குத் திரும்புக', caseAssessment: 'மதிப்பீட்டுப் பதில்கள்', complaintStory: 'விருப்ப அனுபவப் பகிர்வு', noStory: 'அனுபவம் பகிரப்படவில்லை.', consentStatus: 'ஒப்புதல் நிலை', consentGiven: 'ஒப்புதல் பதிவு செய்யப்பட்டது', timestamp: 'சமர்ப்பிக்கப்பட்டது', recommendations: 'பரிந்துரைக்கப்பட்ட ஆதரவு', officerActions: 'அலுவலர் நடவடிக்கைகள்',
    assignCounsellor: 'ஆலோசகரை நியமிக்கவும்', counsellorAssigned: 'ஆலோசகர் நியமிக்கப்பட்டார்', requestLegal: 'சட்ட மதிப்பாய்வைக் கோருக', legalRequested: 'சட்ட மதிப்பாய்வு கோரப்பட்டது', markUrgent: 'அவசர மனித மதிப்பாய்வுக்குக் குறிக்கவும்', urgentMarked: 'அவசர மதிப்பாய்வு குறிக்கப்பட்டது', addNote: 'அலுவலர் குறிப்பைச் சேர்க்கவும்', notePlaceholder: 'உள்குறிப்பை உள்ளிடுக…', saveNote: 'குறிப்பைச் சேமிக்கவும்', notesTitle: 'அலுவலர் குறிப்புகள்', noNotes: 'இதுவரை குறிப்புகள் இல்லை.', updateStatus: 'வழக்கு நிலையைப் புதுப்பிக்கவும்', saveStatus: 'நிலையைச் சேமிக்கவும்', statusSaved: 'வழக்கு நிலை புதுப்பிக்கப்பட்டது.', actionSaved: 'அலுவலர் நடவடிக்கை சேமிக்கப்பட்டது.', noteSaved: 'அலுவலர் குறிப்பு சேமிக்கப்பட்டது.',
    langEnglish: 'ஆங்கிலம்', langTamil: 'தமிழ்', languageEnglish: 'ஆங்கிலம்', languageTamil: 'தமிழ்', indicatorFearShort: 'பயம்', indicatorThreatShort: 'அச்சுறுத்தல்', indicatorSafetyShort: 'பாதுகாப்புக் கவலை', indicatorAnxietyShort: 'பதற்றம்', indicatorIsolationShort: 'தனிமை', indicatorCommunicationShort: 'தொடர்புச் சிரமம்', dateToday: 'இன்று', listeningStarted: 'குரல் உள்ளீடு தொடங்கியது.', listeningError: 'குரல் உள்ளீட்டைத் தொடங்க முடியவில்லை. பதிலைத் தட்டச்சு செய்யவும்.', footerText: 'SAHAY பொதுச் சேவை காட்சிமாதிரி; விளக்கத்திற்காக மட்டுமே.', footerDisclaimer: 'மருத்துவக் கருவி அல்ல · மனித மதிப்பாய்வு அவசியம்',
  },
}

const questions = [
  { key: 'questionFeeling', options: ['optCalm', 'optWorried', 'optAnxious', 'optDistressed'] },
  { key: 'questionSafety', options: ['optNo', 'optALittle', 'optYes', 'optImmediate'] },
  { key: 'questionExplain', options: ['optEasy', 'optSomewhat', 'optVeryDifficult', 'optCannotExplain'] },
  { key: 'questionSupport', options: ['optNo', 'optSometimes', 'optOften', 'optIsolated'] },
]

const supportKeys = {
  low: ['supportLow1', 'supportLow2'], moderate: ['supportModerate1', 'supportModerate2'],
  high: ['supportHigh1', 'supportHigh2', 'supportHigh3', 'supportHigh4'],
  critical: ['supportCritical1', 'supportCritical2', 'supportCritical3', 'supportCritical4'],
}

const indicatorTitles = {
  highAnxiety: ['indicatorHighAnxiety', 'reasonHighAnxiety'], safetyConcern: ['indicatorSafety', 'reasonSafety'],
  communicationDifficulty: ['indicatorDifficulty', 'reasonDifficulty'], isolation: ['indicatorIsolation', 'reasonIsolation'],
  fear: ['indicatorFear', 'reasonFear'], threat: ['indicatorThreat', 'reasonThreat'], emotionalDistress: ['indicatorDistress', 'reasonDistress'],
}

const riskNames = { low: 'riskLow', moderate: 'riskModerate', high: 'riskHigh', critical: 'riskCritical' }

function languageLabel(caseLanguage, t) {
  return t(caseLanguage === 'ta' ? 'languageTamil' : 'languageEnglish')
}

function deriveIndicators(answers, narrative = '') {
  const normalized = narrative.toLowerCase()
  const indicators = []
  if (answers[0] >= 2) indicators.push('highAnxiety')
  if (answers[1] >= 1) indicators.push('safetyConcern')
  if (answers[2] >= 2) indicators.push('communicationDifficulty')
  if (answers[3] >= 2) indicators.push('isolation')
  if (/(afraid|fear|scared|பயமாக|பயம்)/i.test(normalized)) indicators.push('fear')
  if (/(threat|threatened|threatening|அச்சுறுத்த)/i.test(normalized)) indicators.push('threat')
  if (answers[0] >= 2 || /(distress|panic|terrified|உளைச்சல்|பதற்றம்)/i.test(normalized)) indicators.push('emotionalDistress')
  return [...new Set(indicators)]
}

function evaluateAssessment(answers, narrative) {
  const points = [0, 8, 17, 25]
  const safetyPoints = [0, 10, 21, 30]
  const communicationPoints = [0, 7, 14, 20]
  const supportPoints = [0, 5, 10, 15]
  const storySignals = deriveIndicators(answers, narrative).filter((key) => ['fear', 'threat', 'emotionalDistress'].includes(key)).length
  const score = Math.min(100, points[answers[0]] + safetyPoints[answers[1]] + communicationPoints[answers[2]] + supportPoints[answers[3]] + Math.min(10, storySignals * 4))
  const risk = score <= 24 ? 'low' : score <= 49 ? 'moderate' : score <= 74 ? 'high' : 'critical'
  return { score, risk, indicators: deriveIndicators(answers, narrative) }
}

function createDemoCases() {
  const now = Date.now()
  const makeCase = (id, daysAgo, answers, narrative, score, risk, indicators, language = 'en', status = 'new') => ({
    id, createdAt: new Date(now - daysAgo * 86400000).toISOString(), language, answers, narrative, score, risk, indicators, status, consent: true,
    actions: { counsellor: false, legal: false, urgent: risk === 'critical' }, notes: [],
  })
  return [
    makeCase('SH-260914', 0, [2, 3, 2, 1], 'I am afraid to return home. I was threatened recently and I do not know whom to ask for help.', 72, 'high', ['highAnxiety', 'safetyConcern', 'communicationDifficulty', 'fear', 'threat', 'emotionalDistress']),
    makeCase('SH-260913', 1, [1, 1, 1, 0], 'I feel worried and would like to understand what my options are.', 38, 'moderate', ['safetyConcern']),
    makeCase('SH-260912', 2, [0, 0, 0, 0], 'I would like some general information before I decide what to do.', 12, 'low', [], 'ta', 'review'),
    makeCase('SH-260911', 3, [3, 3, 3, 3], 'I feel terrified and unsafe. I was threatened and I cannot explain everything right now.', 91, 'critical', ['highAnxiety', 'safetyConcern', 'communicationDifficulty', 'isolation', 'fear', 'threat', 'emotionalDistress'], 'en', 'review'),
  ]
}

function readCases() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(saved) && saved.length) return saved
  } catch {
    // Restore a usable demo dataset if local storage is malformed.
  }
  return createDemoCases()
}

function getLanguage() {
  try { return localStorage.getItem(LANGUAGE_KEY) === 'ta' ? 'ta' : 'en' } catch { return 'en' }
}

function formatDate(value, language, includeTime = false) {
  const locale = language === 'ta' ? 'ta-IN' : 'en-IN'
  return new Intl.DateTimeFormat(locale, includeTime ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' }).format(new Date(value))
}

function App() {
  const [language, setLanguage] = useState(getLanguage)
  const [page, setPage] = useState('home')
  const [cases, setCases] = useState(readCases)
  const [activeCaseId, setActiveCaseId] = useState(null)
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [assessmentStep, setAssessmentStep] = useState(0)
  const [answers, setAnswers] = useState([null, null, null, null])
  const [narrative, setNarrative] = useState('')
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [noteDraft, setNoteDraft] = useState('')
  const [statusDraft, setStatusDraft] = useState('new')
  const [toast, setToast] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)
  const t = (key) => copy[language][key] || copy.en[key] || key

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cases)) } catch {
      // Keep the current session usable when browser storage is unavailable.
    }
  }, [cases])

  useEffect(() => {
    try { localStorage.setItem(LANGUAGE_KEY, language) } catch { /* Current-session selection remains available. */ }
    document.documentElement.lang = language
    document.title = language === 'ta' ? 'SAHAY – அதிர்ச்சி உணர்வுடன் புகார் ஆதரவு' : 'SAHAY – Trauma-Aware Complaint Support'
  }, [language])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const activeCase = cases.find((item) => item.id === activeCaseId)

  const updateCase = (id, updater) => setCases((current) => current.map((item) => item.id === id ? updater(item) : item))
  const beginAssessment = () => { setConsent(false); setConsentError(false); setAnswers([null, null, null, null]); setNarrative(''); setAssessmentStep(0); setPage('consent') }
  const continueConsent = () => { if (!consent) { setConsentError(true); return } setPage('assessment') }

  const submitAssessment = () => {
    const evaluation = evaluateAssessment(answers, narrative)
    const caseItem = { id: `SH-${String(Date.now()).slice(-6)}`, createdAt: new Date().toISOString(), language, answers, narrative: narrative.trim(), ...evaluation, consent: true, status: 'new', actions: { counsellor: false, legal: false, urgent: evaluation.risk === 'critical' }, notes: [] }
    setCases((current) => [caseItem, ...current])
    setActiveCaseId(caseItem.id)
    setPage('result')
  }

  const openCase = (caseItem) => { setActiveCaseId(caseItem.id); setStatusDraft(caseItem.status); setPage('case') }
  const changeLanguage = (nextLanguage) => { setLanguage(nextLanguage); if (recognitionRef.current) recognitionRef.current.lang = nextLanguage === 'ta' ? 'ta-IN' : 'en-IN' }

  const toggleVoiceInput = () => {
    if (isListening && recognitionRef.current) { recognitionRef.current.stop(); setIsListening(false); return }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) { setToast(t('voiceUnsupported')); return }
    const recognition = new SpeechRecognition()
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => { const spokenText = event.results[0][0].transcript; setNarrative((current) => current ? `${current.trim()} ${spokenText}` : spokenText) }
    recognition.onerror = () => { setIsListening(false); setToast(t('listeningError')) }
    recognition.onend = () => setIsListening(false)
    recognitionRef.current = recognition
    try { recognition.start(); setIsListening(true); setToast(t('listeningStarted')) } catch { setIsListening(false); setToast(t('listeningError')) }
  }

  const saveOfficerAction = (action) => { updateCase(activeCase.id, (item) => ({ ...item, actions: { ...item.actions, [action]: !item.actions[action] } })); setToast(t('actionSaved')) }
  const saveNote = () => {
    if (!noteDraft.trim()) return
    const note = { text: noteDraft.trim(), createdAt: new Date().toISOString() }
    updateCase(activeCase.id, (item) => ({ ...item, notes: [...(item.notes || []), note] }))
    setNoteDraft('')
    setToast(t('noteSaved'))
  }
  const saveStatus = () => { updateCase(activeCase.id, (item) => ({ ...item, status: statusDraft })); setToast(t('statusSaved')) }

  const filteredCases = cases.filter((item) => {
    const query = search.trim().toLowerCase()
    const indicatorText = item.indicators.map((key) => t(indicatorTitles[key]?.[0] || key)).join(' ').toLowerCase()
    const matchesSearch = !query || item.id.toLowerCase().includes(query) || indicatorText.includes(query)
    return matchesSearch && (riskFilter === 'all' || item.risk === riskFilter) && (statusFilter === 'all' || item.status === statusFilter)
  })
  const caseStats = ['low', 'moderate', 'high', 'critical'].map((risk) => ({ risk, count: cases.filter((item) => item.risk === risk).length }))
  const immediateCount = cases.filter((item) => item.risk === 'critical' || item.actions?.urgent).length

  const header = (
    <header className="topbar">
      <button type="button" className="brand-lockup" onClick={() => setPage('home')} aria-label={`SAHAY, ${t('navHome')}`}>
        <span className="brand-mark"><Shield aria-hidden="true" size={21} strokeWidth={1.8} /></span><span className="brand-copy"><strong>SAHAY</strong><small>{t('brandSubtitle')}</small></span>
      </button>
      <div className="header-actions"><span className="public-service"><span className="status-dot" />{t('publicService')}</span>
        <div className="language-control" aria-label={t('language')}><Languages aria-hidden="true" size={15} /><button type="button" className={language === 'en' ? 'selected' : ''} onClick={() => changeLanguage('en')} aria-pressed={language === 'en'}>{t('langEnglish')}</button><span className="language-divider" /><button type="button" className={language === 'ta' ? 'selected' : ''} onClick={() => changeLanguage('ta')} aria-pressed={language === 'ta'}>{t('langTamil')}</button></div>
        {page !== 'home' && <button type="button" className="button button-quiet header-dashboard" onClick={() => setPage('dashboard')}><ClipboardList size={16} />{t('officerDashboard')}</button>}
      </div>
    </header>
  )

  const footer = <footer className="site-footer"><span>{t('footerText')}</span><span><ShieldCheck size={14} aria-hidden="true" />{t('footerDisclaimer')}</span></footer>

  const renderHome = () => <>
    <main>
      <section className="home-hero page-width"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" />{t('homeEyebrow')}</div><h1>{t('homeTitle')}</h1><p className="hero-intro">{t('homeIntro')}</p>
        <div className="hero-actions"><button type="button" className="button button-primary button-large" onClick={beginAssessment}>{t('startAssessment')}<ArrowRight size={17} /></button><button type="button" className="button button-outline button-large" onClick={() => setPage('dashboard')}><ClipboardList size={17} />{t('officerDashboard')}</button></div>
        <div className="hero-assurance"><LockKeyhole size={14} aria-hidden="true" />{t('confidential')}</div>
      </div><div className="hero-side" aria-label={t('whatToExpect')}><div className="hero-side-top"><span className="hero-icon"><HeartHandshake size={24} /></span><span className="hero-time"><Clock3 size={14} />{t('timeEstimate')}</span></div><p className="side-kicker">{t('whatToExpect')}</p><p className="side-copy">{t('expectText')}</p><div className="side-rule" />
        <div className="assurance-row"><span className="assurance-icon"><LockKeyhole size={16} /></span><span><strong>{t('privateFirst')}</strong><small>{t('privateText')}</small></span></div><div className="assurance-row"><span className="assurance-icon"><UserRoundCheck size={16} /></span><span><strong>{t('humanLed')}</strong><small>{t('humanText')}</small></span></div>
      </div></section>
      <section className="flow-section"><div className="page-width"><div className="section-heading"><span className="section-index">01</span><div><h2>{t('howTitle')}</h2><p>{t('howLead')}</p></div></div><div className="flow-track">
        {[
          ['flowInput', 'flowInputSub', MessageSquareText], ['flowConsent', 'flowConsentSub', BadgeCheck], ['flowResponses', 'flowResponsesSub', AudioLines], ['flowIndicators', 'flowIndicatorsSub', Activity],
          ['flowScore', 'flowScoreSub', ClipboardList], ['flowRisk', 'flowRiskSub', ShieldAlert], ['flowSupport', 'flowSupportSub', HeartHandshake], ['flowHuman', 'flowHumanSub', UserRoundCheck],
        ].map(([title, subtitle, Icon], index) => <div className="flow-step" key={title}><span className={`flow-icon ${index === 7 ? 'flow-icon-human' : ''}`}><Icon size={18} aria-hidden="true" /></span><span className="flow-step-title">{t(title)}</span><small>{t(subtitle)}</small></div>)}
      </div></div></section>
      <section className="privacy-section page-width"><span className="privacy-emblem"><ShieldCheck size={23} /></span><div className="privacy-copy"><h2>{t('privacyTitle')}</h2><p>{t('privacyCopy')}</p></div><div className="privacy-tags"><span><LockKeyhole size={14} />{t('dataMin')}</span><span><UsersRound size={14} />{t('humanLoop')}</span><span><CircleAlert size={14} />{t('notDiagnosis')}</span></div></section>
    </main>{footer}
  </>

  const renderConsent = () => <main className="page-width workflow-page"><button type="button" className="text-back" onClick={() => setPage('home')}><ArrowLeft size={16} />{t('back')}</button><section className="workflow-card consent-card">
    <div className="workflow-heading"><span className="step-emblem"><ShieldCheck size={21} /></span><div><span className="eyebrow-text">SAHAY · {t('step')} 0 {t('of')} 5</span><h1>{t('consentTitle')}</h1><p>{t('consentIntro')}</p></div></div>
    <div className="consent-reasons">{[['consentWhy', 'consentWhyText', MessageSquareText], ['consentPrivacy', 'consentPrivacyText', LockKeyhole], ['consentTool', 'consentToolText', UserRoundCheck]].map(([title, body, Icon]) => <article className="reason-row" key={title}><span><Icon size={17} /></span><div><h2>{t(title)}</h2><p>{t(body)}</p></div></article>)}</div>
    <label className={`consent-check ${consentError ? 'has-error' : ''}`}><input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setConsentError(false) }} /><span className="custom-check"><Check size={14} /></span><span>{t('consentCheck')}</span></label>{consentError && <p className="inline-error" role="alert">{t('consentRequired')}</p>}
    <div className="workflow-actions"><button type="button" className="button button-outline" onClick={() => setPage('home')}><ArrowLeft size={16} />{t('back')}</button><button type="button" className="button button-primary" onClick={continueConsent}>{t('continue')}<ArrowRight size={16} /></button></div>
  </section></main>

  const renderAssessment = () => {
    const isStoryStep = assessmentStep === 4
    const question = questions[assessmentStep]
    const selectedAnswer = answers[assessmentStep]
    return <main className="page-width workflow-page"><button type="button" className="text-back" onClick={() => setPage('consent')}><ArrowLeft size={16} />{t('back')}</button><section className="workflow-card assessment-card">
      <div className="assessment-top"><div><span className="eyebrow-text">SAHAY · {t('assessmentTitle')}</span><h1>{t('assessmentTitle')}</h1><p>{t('assessmentIntro')}</p></div><span className="step-count">{t('step')} {assessmentStep + 1} {t('of')} 5</span></div>
      <div className="progress-track" role="progressbar" aria-valuenow={assessmentStep + 1} aria-valuemin="1" aria-valuemax="5" aria-label={`${t('step')} ${assessmentStep + 1} ${t('of')} 5`}><span style={{ width: `${((assessmentStep + 1) / 5) * 100}%` }} /></div>
      <div className="question-block"><div className="question-meta"><span>{t('step')} 0{assessmentStep + 1}</span><span>{isStoryStep ? t('optional') : t('required')}</span></div><h2>{isStoryStep ? t('questionStory') : t(question.key)}</h2>
        {isStoryStep ? <div className="story-input-wrap"><textarea value={narrative} onChange={(event) => setNarrative(event.target.value)} placeholder={t('storyPlaceholder')} rows={7} maxLength={1800} aria-label={t('questionStory')} /><div className="story-controls"><button type="button" className={`button button-voice ${isListening ? 'is-listening' : ''}`} onClick={toggleVoiceInput} aria-pressed={isListening}><Mic size={16} />{isListening ? t('voiceListening') : t('voiceInput')}</button><span>{narrative.length}/1800</span></div></div> : <div className="answer-options" role="radiogroup" aria-label={t(question.key)}>{question.options.map((optionKey, index) => <button type="button" key={optionKey} className={`answer-option ${selectedAnswer === index ? 'is-selected' : ''}`} role="radio" aria-checked={selectedAnswer === index} onClick={() => setAnswers((current) => current.map((answer, answerIndex) => answerIndex === assessmentStep ? index : answer))}><span className="radio-dot" /><span>{t(optionKey)}</span></button>)}</div>}
      </div><div className="workflow-actions assessment-actions"><button type="button" className="button button-outline" onClick={() => assessmentStep === 0 ? setPage('consent') : setAssessmentStep((step) => step - 1)}><ArrowLeft size={16} />{t('previousStep')}</button>{assessmentStep < 4 ? <button type="button" className="button button-primary" disabled={selectedAnswer === null} onClick={() => setAssessmentStep((step) => step + 1)}>{t('nextStep')}<ArrowRight size={16} /></button> : <button type="button" className="button button-primary" onClick={submitAssessment}>{t('submitAssessment')}<ArrowRight size={16} /></button>}</div>
    </section></main>
  }

  const renderResult = () => {
    const caseItem = cases.find((item) => item.id === activeCaseId)
    if (!caseItem) return null
    return <main className="page-width workflow-page result-page"><div className="result-thanks"><span className="eyebrow-text">{t('resultEyebrow')}</span><h1>{t('resultTitle')}</h1><p>{t('resultIntro')}</p></div>
      <section className="result-summary"><div className={`score-panel risk-${caseItem.risk}`}><span className="score-label">{t('sviLabel')}</span><strong>{caseItem.score}<small>/100</small></strong><span className={`risk-badge risk-badge-${caseItem.risk}`}>{t(riskNames[caseItem.risk])}</span><div className="score-meter"><span style={{ width: `${caseItem.score}%` }} /></div></div>
        <div className="indicator-panel"><div className="panel-heading"><div><span className="eyebrow-text">{t('riskLabel')}: {t(riskNames[caseItem.risk])}</span><h2>{t('detectedTitle')}</h2></div><span className={`risk-mark risk-mark-${caseItem.risk}`}><Activity size={18} /></span></div>{caseItem.indicators.length ? <ul className="indicator-list">{caseItem.indicators.map((indicator) => <li key={indicator}><span className="indicator-bullet" /><span><strong>{t(indicatorTitles[indicator][0])}</strong><small>{t(indicatorTitles[indicator][1])}</small></span></li>)}</ul> : <p className="empty-indicators">{t('supportLow1')}</p>}</div></section>
      <p className="prototype-notice"><CircleAlert size={16} />{t('prototypeNotice')}</p><p className="score-method">{t('scoreMethod')}</p>
      <section className="support-recommendations"><div className="panel-heading"><div><span className="eyebrow-text">{t('humanLoop')}</span><h2>{t('supportTitle')}</h2></div><HeartHandshake size={20} /></div><ul>{supportKeys[caseItem.risk].map((key) => <li key={key}><CheckCircle2 size={16} />{t(key)}</li>)}</ul>{caseItem.risk === 'critical' && <p className="human-confirm"><ShieldAlert size={15} />{t('humanConfirm')}</p>}</section>
      <div className="saved-confirmation"><CheckCircle2 size={16} />{t('caseSaved')}</div><div className="result-actions"><button type="button" className="button button-outline" onClick={() => setPage('home')}><Home size={16} />{t('returnHome')}</button><button type="button" className="button button-primary" onClick={() => setPage('dashboard')}><ClipboardList size={16} />{t('viewDashboard')}</button></div>
    </main>
  }

  const renderDashboard = () => <main className="dashboard-page page-width"><div className="dashboard-heading"><div><span className="eyebrow-text">{t('dashboardEyebrow')}</span><h1>{t('dashboardTitle')}</h1><p>{t('dashboardIntro')}</p></div><button type="button" className="button button-primary" onClick={beginAssessment}><Plus size={17} />{t('startAssessment')}</button></div>
    <section className="stat-grid" aria-label={t('dashboardTitle')}>{[['totalCases', cases.length, 'stat-total', ClipboardList], ['lowCases', caseStats[0].count, 'stat-low', ShieldCheck], ['moderateCases', caseStats[1].count, 'stat-moderate', Activity], ['highCases', caseStats[2].count, 'stat-high', CircleAlert], ['criticalCases', caseStats[3].count, 'stat-critical', Siren], ['immediateReview', immediateCount, 'stat-urgent', Clock3]].map(([label, value, tone, Icon]) => <article className={`stat-card ${tone}`} key={label}><span className="stat-icon"><Icon size={17} /></span><span className="stat-value">{value}</span><span className="stat-label">{t(label)}</span></article>)}</section>
    <section className="distribution-panel"><div className="distribution-heading"><div><h2>{t('distributionTitle')}</h2><p>{t('distributionCaption')}</p></div><span>{cases.length} {t('totalCases').toLowerCase()}</span></div><div className="distribution-bar" role="img" aria-label={caseStats.map(({ risk, count }) => `${t(riskNames[risk])}: ${count}`).join(', ')}>{caseStats.map(({ risk, count }) => <span key={risk} className={`distribution-segment risk-${risk}`} style={{ width: `${cases.length ? (count / cases.length) * 100 : 0}%` }} />)}</div><div className="distribution-legend">{caseStats.map(({ risk, count }) => <span key={risk}><i className={`legend-dot risk-${risk}`} />{t(riskNames[risk])} <strong>{count}</strong></span>)}</div></section>
    <section className="case-list-section"><div className="case-list-heading"><div><h2>{t('recentCases')}</h2><span>{filteredCases.length} / {cases.length}</span></div><div className="table-filters"><label className="search-field"><Search size={15} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('searchCases')} aria-label={t('searchCases')} />{search && <button type="button" onClick={() => setSearch('')} aria-label={t('back')}><X size={14} /></button>}</label><label className="select-wrap"><select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)} aria-label={t('riskLabel')}><option value="all">{t('allRisks')}</option>{Object.keys(riskNames).map((risk) => <option value={risk} key={risk}>{t(riskNames[risk])}</option>)}</select><ChevronDown size={14} /></label><label className="select-wrap"><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label={t('colStatus')}><option value="all">{t('allStatuses')}</option>{['new', 'review', 'resolved'].map((status) => <option value={status} key={status}>{t(`status${status[0].toUpperCase()}${status.slice(1)}`)}</option>)}</select><ChevronDown size={14} /></label></div></div>
      <div className="table-scroll"><table className="case-table"><thead><tr>{['colCaseId', 'colDate', 'colLanguage', 'colSVI', 'colRisk', 'colIndicators', 'colSupport', 'colStatus', 'colAction'].map((key) => <th key={key}>{t(key)}</th>)}</tr></thead><tbody>{filteredCases.map((item) => <tr key={item.id}><td className="case-id-cell">{item.id}{item.actions?.urgent && <span className="urgent-mini"><Siren size={12} />{t('immediateReview')}</span>}</td><td>{formatDate(item.createdAt, language)}</td><td>{languageLabel(item.language, t)}</td><td className="score-cell">{item.score}<small>/100</small></td><td><span className={`risk-badge risk-badge-${item.risk}`}>{t(riskNames[item.risk])}</span></td><td><div className="table-indicators">{item.indicators.slice(0, 3).map((indicator) => <span key={indicator}>{t(indicatorTitles[indicator]?.[0] || indicator)}</span>)}{item.indicators.length > 3 && <span>+{item.indicators.length - 3}</span>}</div></td><td className="support-cell">{t(supportKeys[item.risk][0])}</td><td><span className={`status-badge status-${item.status}`}>{t(`status${item.status[0].toUpperCase()}${item.status.slice(1)}`)}</span></td><td><button type="button" className="button button-small button-outline" onClick={() => openCase(item)}>{t('viewCase')}<ArrowRight size={14} /></button></td></tr>)}</tbody></table></div>{filteredCases.length === 0 && <p className="no-cases">{t('noCases')}</p>}</section>
  </main>

  const renderCaseDetails = () => {
    if (!activeCase) return <main className="page-width workflow-page"><p className="no-cases">{t('caseNotFound')}</p><button type="button" className="button button-outline" onClick={() => setPage('dashboard')}>{t('backDashboard')}</button></main>
    return <main className="case-detail-page page-width"><button type="button" className="text-back" onClick={() => setPage('dashboard')}><ArrowLeft size={16} />{t('backDashboard')}</button>
      <div className="detail-heading"><div><span className="eyebrow-text">{t('caseDetails')}</span><h1>{activeCase.id}</h1><p>{t('timestamp')}: {formatDate(activeCase.createdAt, language, true)}</p></div><div className="detail-heading-meta"><span className={`risk-badge risk-badge-${activeCase.risk}`}>{t(riskNames[activeCase.risk])}</span><span className={`status-badge status-${activeCase.status}`}>{t(`status${activeCase.status[0].toUpperCase()}${activeCase.status.slice(1)}`)}</span></div></div>
      <div className="detail-layout"><div className="detail-main">
        <section className="detail-card detail-score-card"><div className={`detail-score risk-${activeCase.risk}`}><span>{t('sviLabel')}</span><strong>{activeCase.score}<small>/100</small></strong><div className="score-meter"><span style={{ width: `${activeCase.score}%` }} /></div></div><div className="detail-indicators"><h2>{t('detectedTitle')}</h2><div className="detail-indicator-chips">{activeCase.indicators.map((indicator) => <span key={indicator}>{t(indicatorTitles[indicator]?.[0] || indicator)}</span>)}</div><p className="prototype-notice"><CircleAlert size={15} />{t('prototypeNotice')}</p></div></section>
        <section className="detail-card"><div className="card-title-row"><h2>{t('caseAssessment')}</h2><span className="language-tag"><Languages size={13} />{languageLabel(activeCase.language, t)}</span></div><div className="response-list">{questions.map((question, index) => <div className="response-item" key={question.key}><span>{t(question.key)}</span><strong>{activeCase.answers[index] === null ? '—' : t(question.options[activeCase.answers[index]])}</strong></div>)}</div></section>
        <section className="detail-card"><h2>{t('complaintStory')}</h2><blockquote className="complaint-quote">{activeCase.narrative || t('noStory')}</blockquote></section>
        <section className="detail-card"><h2>{t('recommendations')}</h2><ul className="recommendation-list">{supportKeys[activeCase.risk].map((key) => <li key={key}><CheckCircle2 size={16} />{t(key)}</li>)}</ul>{activeCase.risk === 'critical' && <p className="human-confirm"><ShieldAlert size={15} />{t('humanConfirm')}</p>}</section>
        <section className="detail-card notes-card"><div className="card-title-row"><h2>{t('notesTitle')}</h2><span>{activeCase.notes?.length || 0}</span></div>{activeCase.notes?.length ? <ul className="notes-list">{activeCase.notes.map((note, index) => <li key={`${note.createdAt}-${index}`}><p>{note.text}</p><time>{formatDate(note.createdAt, language, true)}</time></li>)}</ul> : <p className="no-notes">{t('noNotes')}</p>}<label className="note-label" htmlFor="officer-note">{t('addNote')}</label><textarea id="officer-note" className="officer-note-input" value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder={t('notePlaceholder')} rows={3} /><button type="button" className="button button-primary button-small save-note" disabled={!noteDraft.trim()} onClick={saveNote}><Check size={15} />{t('saveNote')}</button></section>
      </div><aside className="detail-sidebar"><section className="detail-card officer-action-card"><h2>{t('officerActions')}</h2><button type="button" className={`officer-action ${activeCase.actions?.counsellor ? 'action-done' : ''}`} onClick={() => saveOfficerAction('counsellor')}><span className="action-icon"><Headphones size={17} /></span><span>{activeCase.actions?.counsellor ? t('counsellorAssigned') : t('assignCounsellor')}</span><CheckCircle2 size={16} /></button><button type="button" className={`officer-action ${activeCase.actions?.legal ? 'action-done' : ''}`} onClick={() => saveOfficerAction('legal')}><span className="action-icon"><FileText size={17} /></span><span>{activeCase.actions?.legal ? t('legalRequested') : t('requestLegal')}</span><CheckCircle2 size={16} /></button><button type="button" className={`officer-action ${activeCase.actions?.urgent ? 'action-done action-urgent' : ''}`} onClick={() => saveOfficerAction('urgent')}><span className="action-icon"><Siren size={17} /></span><span>{activeCase.actions?.urgent ? t('urgentMarked') : t('markUrgent')}</span><CheckCircle2 size={16} /></button></section>
        <section className="detail-card status-editor"><h2>{t('updateStatus')}</h2><label className="select-wrap status-select"><select value={statusDraft} onChange={(event) => setStatusDraft(event.target.value)} aria-label={t('updateStatus')}>{['new', 'review', 'resolved'].map((status) => <option value={status} key={status}>{t(`status${status[0].toUpperCase()}${status.slice(1)}`)}</option>)}</select><ChevronDown size={14} /></label><button type="button" className="button button-outline button-block" onClick={saveStatus}><Check size={15} />{t('saveStatus')}</button></section>
        <section className="detail-card consent-status-card"><span className="consent-status-icon"><LockKeyhole size={16} /></span><div><strong>{t('consentStatus')}</strong><small>{activeCase.consent ? t('consentGiven') : t('consentRequired')}</small></div></section></aside></div>
    </main>
  }

  return <div className="app-shell">{header}{page === 'home' && renderHome()}{page === 'consent' && renderConsent()}{page === 'assessment' && renderAssessment()}{page === 'result' && renderResult()}{page === 'dashboard' && renderDashboard()}{page === 'case' && renderCaseDetails()}{page !== 'home' && footer}{toast && <div className="toast-message" role="status"><CheckCircle2 size={16} />{toast}<button type="button" onClick={() => setToast('')} aria-label={t('back')}><X size={14} /></button></div>}</div>
}

export default App
