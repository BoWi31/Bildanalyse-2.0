
import { StepData } from './types';

export const INSTRUCTION_HINT = "WICHTIG: Nutze das digitale Protokoll für deine Notizen und übertrage sie später auf das Blatt!";

// Platzhalter-URL für das Hauptbild
export const DUMMY_IMAGE_URL = "https://placehold.co/800x1000/2e1065/ffffff?text=HISTORISCHES+BILD+HIER\n(Delacroix+-+Die+Freiheit)";

export const CHECKPOINTS = {
  afterStep1: {
    title: "Detektiv-Erfolg!",
    task: "Welche dieser Details hast du im Bild wirklich gesehen? Klicke sie an!",
    items: [
      { id: '1', text: 'Türme einer großen Kathedrale', found: false },
      { id: '2', text: 'Ein modernes Gewehr mit Zielfernrohr', found: false, fake: true },
      { id: '3', text: 'Ein Junge mit zwei Pistolen', found: false },
      { id: '4', text: 'Panzer im Hintergrund', found: false, fake: true },
      { id: '5', text: 'Gefallene Soldaten am Boden', found: false },
    ]
  },
  timeline30: [
    { day: "Vorgeschichte", event: "König Karl X. will die absolute Macht zurück. Er erlässt die 'Juli-Ordonnanzen': Pressefreiheit weg, Wahlrecht nur für Reiche." },
    { day: "27. Juli 1830", event: "Der Aufstand beginnt. Drucker und Arbeiter gehen auf die Straße. Erste Schüsse fallen, Barrikaden werden gebaut." },
    { day: "28. Juli 1830", event: "Entscheidungsschlacht! Das Volk erobert das Rathaus. Die Trikolore weht über Notre-Dame. Über 2.000 Tote in den Gassen." },
    { day: "29. Juli 1830", event: "Sieg! Die Truppen des Königs ziehen ab. Karl X. muss fliehen. Ein neuer, liberalerer 'Bürgerkönig' kommt an die Macht." }
  ]
};

export const STEPS: StepData[] = [
  {
    number: 1,
    icon: '📐',
    title: 'Beschreibung',
    subtitle: 'Was kannst du mit deinen Augen sehen?',
    description: 'Wir suchen zuerst nur Dinge, die man im Bild wirklich sieht. Bleib sachlich und genau!',
    points: [
      'Welche Gegenstände liegen im Vordergrund am Boden?',
      'Wie ist die Frau in der Mitte gekleidet und was hält sie?',
      'Welche verschiedenen Kopfbedeckungen (Zylinder, Mützen) siehst du?',
      'Was erkennt man im Hintergrund durch den dichten Rauch?',
      'Welche Farben (besonders Blau, Weiß, Rot) fallen dir auf?'
    ],
    sentenceStarters: [
      'Auf dem Bild erkenne ich...',
      'Im Vordergrund sieht man...',
      'Die zentrale Figur trägt...',
      'Im Hintergrund ragen...',
      'Die Farben wirken...'
    ],
    hints: [
      'Schau genau auf die Kleidung: Siehst du den Unterschied zwischen Bürger (Zylinder) und Arbeiter?',
      'Die rote Mütze der Frau ist eine "Phrygische Mütze" – ein Symbol für Freiheit.',
      'Die Türme im Hintergrund gehören zur Kathedrale Notre-Dame in Paris.'
    ]
  },
  {
    number: 2,
    icon: '💭',
    title: 'Hypothesen',
    subtitle: 'Was vermutest du über den Inhalt?',
    description: 'Nutze deine Beobachtungen: Wer kämpft hier gegen wen? Was ist das Ziel?',
    points: [
      'Warum kämpfen Menschen aus so unterschiedlichen Schichten gemeinsam?',
      'Wofür könnte die Frau in der Mitte stehen? Ist sie eine echte Soldatin?',
      'Warum stürmen sie über Barrikaden und Leichen hinweg?',
      'Welches Gefühl wollte der Maler beim Betrachter auslösen?',
      'Glaubst du, das Bild zeigt eine echte Szene oder ist es gestellt?'
    ],
    sentenceStarters: [
      'Ich vermute, dass das Bündnis der Klassen zeigt, dass...',
      'Die Frau symbolisiert wahrscheinlich...',
      'Das Ziel der Kämpfenden scheint zu sein...',
      'Das Bild wirkt auf mich eher wie...',
      'Aufgrund der Details glaube ich, dass...'
    ],
    hints: [
      'Die Barrikaden deuten auf einen Aufstand in einer Stadt hin (Häuserkampf).',
      'Die Trikolore war unter dem König verboten – sie zu zeigen ist ein Akt der Rebellion.',
      'Die Frau wirkt fast wie eine griechische Göttin – das nennt man eine Allegorie.'
    ]
  },
  {
    number: 3,
    icon: '🕰️',
    title: 'Historischer Kontext',
    subtitle: 'Die Revolution von 1830',
    description: 'Lies die Fakten genau. Vergleiche sie mit deinen Vermutungen aus Schritt 2.',
    contextText: 'Nach Napoleon kehrten die Bourbonen-Könige zurück (Restauration). 1830 versuchte Karl X., die Zeit komplett zurückzudrehen: Er schaffte die Pressefreiheit ab und wollte das Parlament entmachten. Das Volk von Paris wehrte sich in den "Drei Glorreichen Tagen" (27.-29. Juli). Über 4.000 Barrikaden wurden errichtet. Es war das erste Mal, dass reiche Bürger und arme Arbeiter gemeinsam gegen den Absolutismus kämpften. Der Maler Delacroix war selbst kein Kämpfer, wollte aber mit diesem Meisterwerk den "Geist der Freiheit" unsterblich machen.',
    points: [
      'Was waren die "Juli-Ordonnanzen" und warum führten sie zur Wut?',
      'Warum war der Kampf in den engen Gassen von Paris so erfolgreich?',
      'Wer war der "Bürgerkönig" Louis-Philippe und was änderte sich?',
      'Warum malte Delacroix das Bild erst nach den Kämpfen?',
      'Welche Rolle spielt die Kathedrale Notre-Dame als Symbol?'
    ],
    sentenceStarters: [
      'Die Ursache für den Aufstand war...',
      'Besonders wichtig für den Sieg war das Bündnis zwischen...',
      'Die "Drei Glorreichen Tage" führten dazu, dass...',
      'Delacroix wollte mit seinem Bild zeigen, dass...',
      'Der historische Hintergrund erklärt, warum...'
    ],
    hints: [
      'Karl X. musste nach England fliehen – die Herrschaft der alten Könige war vorbei.',
      'Das Bild ist keine Fotografie, sondern ein heroisches Denkmal.',
      'Die Trikolore wurde nach 1830 wieder die offizielle Flagge Frankreichs.'
    ]
  },
  {
    number: 4,
    icon: '🔍',
    title: 'Überprüfung',
    subtitle: 'Wahrheit oder Kunst?',
    description: 'Vergleiche das Bild mit der Realität. Was ist echt, was ist erfunden?',
    points: [
      'War die "Freiheit" wirklich als Person auf den Barrikaden?',
      'Warum stellt der Maler den Kampf so "sauber" und heldenhaft dar?',
      'Welche Details im Bild sind historisch absolut korrekt (Waffen, Gebäude)?',
      'Was hat der Maler absichtlich weggelassen (Schmutz, Angst, echte Verzweiflung)?',
      'Ist das Bild eher ein Bericht oder eine Werbung (Propaganda) für die Freiheit?'
    ],
    sentenceStarters: [
      'Vergleiche ich das Bild mit den Fakten, fällt auf, dass...',
      'Die Frau ist eine Erfindung des Malers, um...',
      'Ein sehr realistisches Detail ist hingegen...',
      'Die heroische Darstellung dient dazu...',
      'Man muss das Bild kritisch sehen, weil...'
    ],
    hints: [
      'Die Freiheit (Marianne) ist eine Allegorie – sie verkörpert eine Idee, keinen Menschen.',
      'Der Junge rechts ist die Inspiration für die Figur "Gavroche" in Weltliteratur.',
      'Das Licht im Hintergrund wirkt wie ein göttlicher Segen für die Revolution.'
    ]
  },
  {
    number: 5,
    icon: '🚦',
    title: 'Ampelbewertung',
    subtitle: 'Dein Urteil als Historiker',
    description: 'Wie glaubwürdig ist dieses Bild als Quelle für die Geschichte? Nutze die Ampel!',
    points: [
      'Ist das Bild nützlich, um die Ereignisse von 1830 sachlich zu verstehen?',
      'Was lernt man hier über die Ideale der Menschen, was kein Text sagen kann?',
      'Würdest du dieses Bild als "Beweisfoto" in einer Doku verwenden?',
      'Warum ist dieses Bild so berühmt geworden, obwohl es nicht ganz "echt" ist?',
      'Begründe deine Farbwahl abschließend im Notizblock.'
    ],
    sentenceStarters: [
      'Ich bewerte die Glaubwürdigkeit mit..., weil...',
      'Als historische Quelle ist das Bild wertvoll für...',
      'Man darf dem Bild nicht blind trauen, da...',
      'Besonders beeindruckend finde ich...',
      'Zusammenfassend ist das Bild für Historiker...'
    ],
    hints: [
      'Rot: Das Bild ist reine Propaganda und verdreht die Tatsachen zu stark.',
      'Gelb: Es ist ein wichtiges Zeitdokument, aber man muss die Absicht des Malers kennen.',
      'Grün: Es zeigt perfekt, wie die Menschen damals gedacht und gefühlt haben.'
    ]
  }
];

export const AMPEL_FEEDBACK = {
  red: "Kritische Sicht: Du bewertest das Bild als heroisierende Propaganda. Es zeigt nicht die Realität, sondern ein Wunschbild des Malers.",
  yellow: "Differenzierte Sicht: Du erkennst den Wert als Zeitdokument, weißt aber, dass Delacroix viele Details verschönert hat.",
  green: "Begeisterte Sicht: Du siehst das Bild als perfekte Quelle für die Symbole und die Leidenschaft der Revolutionäre von 1830."
};
