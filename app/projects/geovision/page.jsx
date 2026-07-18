import ProjectPage from '../../components/ProjectPage';

export const metadata = {
  title: 'GeoVision Explorer — Saba Salamah',
  description:
    'Graduation project: a Flutter AR app that teaches children geometry by recognizing and measuring real-world objects with YOLOv5 and OpenCV.',
};

const content = {
  EN: {
    year: '2024 – 2025',
    title: 'GeoVision Explorer',
    description: 'An AR app that turns geometry into something children can see, touch, and measure.',
    overview:
      'My graduation project: an interactive mobile app that makes geometry learning fun for kids 7+ by turning their surroundings into a classroom. Computer vision identifies and measures real-world objects, overlaying geometric concepts in real time — served by machine learning models behind a Flask REST API.',
    features: [
      'Real-time object detection and measurement',
      'Interactive AR geometry overlays',
      'Child-friendly UI with engaging animations',
      '3D shape visualization and manipulation',
      'Progress tracking and achievements',
      'Parent dashboard for monitoring',
    ],
    stack: ['Flutter', 'Firebase', 'YOLOv5', 'OpenCV', 'Flask', 'Python', 'TorchVision'],
    challenge:
      'Keeping AR performance real-time while detecting objects accurately across different lighting conditions and device capabilities.',
    solution:
      'Quantized the models for mobile, added adaptive lighting compensation, and moved processing on-device with Firebase ML Kit to cut latency.',
    images: [
      '/images/geo1.png',
      '/images/geo2.png',
      '/images/geo3.png',
      '/images/geo4.png',
      '/images/geo5.png',
      '/images/geo6.png',
    ],
  },
  AR: {
    year: '2024 – 2025',
    title: 'GeoVision Explorer',
    description: 'تطبيق واقع معزز يحوّل الهندسة إلى شيء يشوفه الطفل ويلمسه ويقيسه.',
    overview:
      'مشروع تخرجي: تطبيق تفاعلي يجعل تعلم الهندسة ممتعاً للأطفال من عمر ٧ سنوات بتحويل محيطهم إلى فصل دراسي. تتعرف رؤية الحاسب على الأجسام الحقيقية وتقيسها، وتعرض المفاهيم الهندسية لحظياً — عبر نماذج تعلم آلة خلف واجهة Flask REST API.',
    features: [
      'كشف الأجسام وقياسها في الوقت الفعلي',
      'عروض هندسية تفاعلية بالواقع المعزز',
      'واجهة صديقة للأطفال برسوم متحركة جذابة',
      'عرض الأشكال ثلاثية الأبعاد والتفاعل معها',
      'تتبع التقدم والإنجازات',
      'لوحة متابعة للأهل',
    ],
    stack: ['Flutter', 'Firebase', 'YOLOv5', 'OpenCV', 'Flask', 'Python', 'TorchVision'],
    challenge: 'الحفاظ على أداء واقع معزز لحظي مع دقة الكشف في مختلف ظروف الإضاءة وقدرات الأجهزة.',
    solution:
      'تكميم النماذج للأجهزة المحمولة، وإضافة موازنة إضاءة متكيفة، ونقل المعالجة إلى الجهاز عبر Firebase ML Kit لتقليل التأخير.',
    images: [
      '/images/geo1.png',
      '/images/geo2.png',
      '/images/geo3.png',
      '/images/geo4.png',
      '/images/geo5.png',
      '/images/geo6.png',
    ],
  },
};

export default function GeoVisionPage() {
  return <ProjectPage content={content} imageAspect="aspect-[9/16]" />;
}
