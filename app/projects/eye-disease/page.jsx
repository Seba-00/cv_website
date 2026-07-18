import ProjectPage from '../../components/ProjectPage';

export const metadata = {
  title: 'Eye Disease Analysis System — Saba Salamah',
  description:
    'A web-based diagnosis aid that detects, segments, and classifies eye disease in retinal scans using YOLOv8 and Faster R-CNN.',
};

const content = {
  EN: {
    year: '2024',
    title: 'Eye Disease Analysis System',
    description:
      'A web-based diagnosis aid that detects, segments, and classifies eye disease in retinal scans.',
    overview:
      'The system analyzes retinal scans with computer vision to flag signs of eye disease, helping medical professionals with early diagnosis and treatment planning. Detection and segmentation run on an ensemble of YOLOv8 and Faster R-CNN models.',
    features: [
      'Multi-disease detection, including diabetic retinopathy and glaucoma',
      'High-accuracy image classification on high-resolution fundus images',
      'Lesion localization through object detection and segmentation',
    ],
    stack: ['Python', 'YOLOv8', 'Faster R-CNN', 'PyTorch', 'TensorFlow', 'OpenCV', 'Flask'],
    challenge:
      'Reaching medical-grade accuracy while keeping real-time performance on high-resolution fundus images.',
    solution:
      'Model quantization and an optimized preprocessing pipeline, with YOLOv8 and Faster R-CNN combined as an ensemble to raise detection accuracy.',
    images: [
      '/images/2eye.png',
      '/images/3eye.png',
      '/images/5eye.png',
      '/images/6eye.png',
      '/images/7eye.png',
      '/images/4eye.png',
    ],
    video: 'SaEzj-ocdCo',
  },
  AR: {
    year: '2024',
    title: 'نظام تحليل أمراض العين',
    description: 'أداة ويب مساعدة للتشخيص تكشف أمراض العين في صور الشبكية وتحدد مواقعها وتصنفها.',
    overview:
      'يحلل النظام صور الشبكية باستخدام رؤية الحاسب لرصد مؤشرات أمراض العين، مما يساعد الأطباء في التشخيص المبكر والتخطيط العلاجي. يعتمد الكشف والتجزئة على دمج نموذجي YOLOv8 و Faster R-CNN.',
    features: [
      'كشف أمراض متعددة، منها اعتلال الشبكية السكري والجلوكوما',
      'تصنيف عالي الدقة لصور قاع العين عالية الوضوح',
      'تحديد مواقع الآفات عبر كشف الأجسام والتجزئة',
    ],
    stack: ['Python', 'YOLOv8', 'Faster R-CNN', 'PyTorch', 'TensorFlow', 'OpenCV', 'Flask'],
    challenge: 'الوصول لدقة طبية موثوقة مع الحفاظ على أداء فوري للصور عالية الدقة.',
    solution:
      'تكميم النماذج وتحسين خطوات المعالجة المسبقة، مع دمج YOLOv8 و Faster R-CNN لرفع دقة الكشف.',
    images: [
      '/images/2eye.png',
      '/images/3eye.png',
      '/images/5eye.png',
      '/images/6eye.png',
      '/images/7eye.png',
      '/images/4eye.png',
    ],
    video: 'SaEzj-ocdCo',
  },
};

export default function EyeDiseasePage() {
  return <ProjectPage content={content} imageAspect="aspect-[4/3]" />;
}
