import 'dotenv/config'
import {PrismaClient} from '@/app/generated/prisma'
import {PrismaPg} from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({adapter})

const features = [
  {
    icon: 'ShieldCheck',
    title: 'Asuransi All-Risk',
    description: 'Setiap perjalanan terlindungi penuh. Tenang berkendara tanpa khawatir risiko di jalan.',
  },
  {
    icon: 'BadgePercent',
    title: 'Harga Transparan',
    description: 'Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga yang Anda bayar.',
  },
  {
    icon: 'Sparkles',
    title: 'Armada Terawat',
    description: 'Semua mobil dirawat rutin dan diperiksa sebelum setiap penyewaan dimulai.',
  },
  {
    icon: 'MapPinned',
    title: 'GPS Tracker',
    description: 'Setiap unit dilengkapi GPS untuk keamanan dan kenyamanan selama perjalanan.',
  },
  {
    icon: 'Headset',
    title: 'Support 24/7',
    description: 'Tim customer service siap membantu Anda kapan pun, di mana pun Anda berada.',
  },
  {
    icon: 'FileCheck2',
    title: 'Proses Super Cepat',
    description: 'Cukup KTP dan SIM, booking selesai dalam hitungan menit lewat sistem online.',
  },
]

const testimonials = [
  {
    name: 'Budi Santoso',
    pekerjaan: 'Traveler',
    description: 'Proses booking cepat banget, mobilnya bersih dan wangi. Supirnya juga ramah dan paham rute. Recommended!',
    is_publish: true,
  },
  {
    name: 'Siti Rahma',
    pekerjaan: 'Ibu Rumah Tangga',
    description: 'Sewa untuk arisan keluarga, mobil lega dan nyaman. Harganya masuk akal dengan pelayanan sebaik ini.',
    is_publish: true,
  },
  {
    name: 'Andi Wijaya',
    pekerjaan: 'Pengusaha',
    description: 'Langganan tiap ada tamu bisnis. Armada selalu prima dan tim support-nya responsif 24 jam. Mantap!',
    is_publish: true,
  },
  {
    name: 'Dewi Lestari',
    pekerjaan: 'Content Creator',
    description: 'Mobil datang tepat waktu bahkan lebih awal. Proses administrasinya gampang, cukup KTP dan SIM saja.',
    is_publish: true,
  },
  {
    name: 'Rizky Pratama',
    pekerjaan: 'Mahasiswa',
    description: 'Lepas kunci ke luar kota bareng teman-teman, harganya bersahabat buat kantong mahasiswa. Seru!',
    is_publish: true,
  },
  {
    name: 'Maya Kusuma',
    pekerjaan: 'Karyawan Swasta',
    description: 'Ada asuransi all-risk jadi tenang. Pernah kena batu di jalan tol, langsung ditanggung tanpa drama.',
    is_publish: true,
  },
]

async function main() {
  await prisma.feature.deleteMany()
  await prisma.feature.createMany({data: features})
  console.log(`Berhasil seed ${features.length} data feature`)

  await prisma.testimoni.deleteMany()
  await prisma.testimoni.createMany({data: testimonials})
  console.log(`Berhasil seed ${testimonials.length} data testimoni`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
