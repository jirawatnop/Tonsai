import type {Package} from '@/types';

export const packages: Package[] = [
  {
    id: 'banana-me',
    slug: 'banana-me',
    name: { th: 'BANANA ME', en: 'BANANA ME', zh: '香蕉喂食' },
    duration: '30 นาที / 30 minutes',
    price: { adult: 800, child: 600 },
    activities: ['ให้อาหารช้าง'],
    bookingUrl: 'https://tonsaielephantphuket.com/banana-me/'
  },
  {
    id: 'trek-with-me',
    slug: 'trek-with-me',
    name: { th: 'TREK WITH ME', en: 'TREK WITH ME', zh: '与我同行' },
    duration: '1 ชั่วโมง / 1 hour',
    price: { note: 'ประมาณ 1,600 THB' },
    activities: ['ให้อาหาร', 'เดินเล่นกับช้าง'],
    bookingUrl: 'https://tonsaielephantphuket.com/trek-with-me/'
  },
  {
    id: 'hello-elephants',
    slug: 'hello-elephants',
    name: { th: 'HELLO ELEPHANTS', en: 'HELLO ELEPHANTS', zh: '你好，大象' },
    duration: '3 ชั่วโมง / 3 hours',
    price: { note: 'ประมาณ 2,500 THB' },
    activities: ['เรียนรู้เกี่ยวกับช้าง', 'ให้อาหาร', 'เดินเล่น', 'อาบน้ำช้าง', 'ถ่ายรูป'],
    bookingUrl: 'https://tonsaielephantphuket.com/hello-elephants/'
  },
  {
    id: 'thai-culture',
    slug: 'thai-culture',
    name: { th: 'THAI CULTURE', en: 'THAI CULTURE', zh: '泰国文化一日' },
    duration: '6 ชั่วโมง (เต็มวัน) / 6 hours (Full day)',
    price: { adult: 5200, child: 4700 },
    activities: ['กิจกรรมกับช้าง', 'ทำอาหารไทย', 'บุฟเฟ่ต์อาหารไทย'],
    bookingUrl: 'https://tonsaielephantphuket.com/thai-culture/'
  },
  {
    id: 'elephants-care',
    slug: 'elephants-care',
    name: { th: 'ELEPHANTS CARE', en: 'ELEPHANTS CARE', zh: '大象护理' },
    duration: '90-120 นาที / 90-120 minutes',
    price: { adult: 1900, child: 1500 },
    activities: ['ดูแลช้าง', 'Mud spa', 'อาบน้ำช้างในทะเลสาบ'],
    bookingUrl: 'https://tonsaielephantphuket.com/elephants-care/'
  },
  {
    id: 'clean-me',
    slug: 'clean-me',
    name: { th: 'CLEAN ME', en: 'CLEAN ME', zh: '清洁我' },
    duration: '1 ชั่วโมง / 1 hour',
    price: { note: 'ประมาณ 1,600 THB' },
    activities: ['อาบน้ำ', 'ทำความสะอาดช้าง'],
    bookingUrl: 'https://tonsaielephantphuket.com/clean-me/'
  },
  {
    id: 'muddy-spa',
    slug: 'muddy-spa',
    name: { th: 'MUDDY SPA', en: 'MUDDY SPA', zh: '泥浆水疗' },
    duration: '1 ชั่วโมง / 1 hour',
    price: { note: 'ประมาณ 1,600 THB' },
    activities: ['เล่นโคลนกับช้าง', 'อาบน้ำช้าง'],
    bookingUrl: 'https://tonsaielephantphuket.com/muddy-spa/'
  },
  {
    id: 'bath-and-shower',
    slug: 'bath-and-shower',
    name: { th: 'BATH AND SHOWER', en: 'BATH AND SHOWER', zh: '沐浴戏水' },
    duration: '1 ชั่วโมง / 1 hour',
    price: { adult: 1600, child: 1400, note: 'เด็กอายุต่ำกว่า 4 ปี ฟรี' },
    activities: ['ว่ายน้ำกับช้าง', 'อาบน้ำช้างในสระธรรมชาติ'],
    bookingUrl: 'https://tonsaielephantphuket.com/bath-shower/'
  }
];

export const siteInfo = {
  promoCode: 'TONSAIP10',
  phone: '095-0364454',
  email: 'Infotonsaielephant@gmail.com',
  location: {
    th: 'ใกล้หาดป่าตอง ภูเก็ต (5 นาทีจากป่าตอง)',
    en: 'Near Patong Beach, Phuket (5 minutes from Patong)',
    zh: '靠近普吉岛芭东海滩（距离约5分钟）'
  },
  certifications: ['SHA Plus', 'Safe Travels certified']
};
