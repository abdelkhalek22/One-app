export const educationalLevels = [
    'الأول الإعدادي',
    'الثاني الإعدادي',
    'الثالث الإعدادي',
    'الأول الثانوي',
    'الثاني الثانوي',
    'الثالث الثانوي'
];

export const subjects = [
    'لغة عربية',
    'لغة إنجليزية',
    'رياضيات',
    'علوم',
    'دراسات اجتماعية',
    'فيزياء',
    'كيمياء',
    'أحياء'
];

export const teachers = [
    'أ. محمد أحمد',
    'أ. سارة علي',
    'أ. محمود حسن',
    'د. إبراهيم خليل'
];

export const bookTypes = [
    'مذكرة شرح',
    'مذكرة مراجعة نهائية',
    'كتاب خارجي',
    'ملخص'
];

// Mock function to get price and availability
export const getBookDetails = (level, subject, teacher, type) => {
    // Random availability for demo
    const isAvailable = Math.random() > 0.2;
    const price = Math.floor(Math.random() * (150 - 50 + 1)) + 50; // Random price between 50 and 150

    return {
        isAvailable,
        price,
        title: `${type} - ${subject}`,
        description: `مذكرة ${subject} للصف ${level} مع ${teacher}`
    };
};
