export type PortfolioProject = {
  id: string; name: string[]; category: string; url: string; image: string;
  mobile: string; detail: string; caption: string[]; light: boolean; number: string; mobileWidth?:number;
};

export const portfolio: PortfolioProject[] = [
  {id:'cimuning',name:['Cimuning','Digital Hub.'],category:'E-Katalog UMKM',url:'cimuning.com',image:'projects/cimuning.webp',mobile:'projects/cimuning-mobile-clean.png',mobileWidth:375,detail:'projects/cimuning-detail-1.webp',caption:['Produk lokal.','Lebih mudah ditemukan.'],light:false,number:'01'},
  {id:'fazmastone',name:['Fazma','Stone.'],category:'Website bisnis',url:'fazmastone.com',image:'projects/fazmastone.webp',mobile:'projects/fazmastone-mobile.webp',detail:'projects/fazmastone-detail-2.webp',caption:['Karakter bisnis.','Hadir di setiap halaman.'],light:true,number:'02'},
  {id:'mahameru-baja',name:['Mahameru','Baja Indonesia.'],category:'Profil perusahaan',url:'mahamerubaja.vercel.app',image:'projects/mahameru-baja.webp',mobile:'projects/mahameru-baja-mobile.webp',detail:'projects/mahameru-baja-detail-2.webp',caption:['Informasi layanan.','Tersusun untuk pelanggan.'],light:false,number:'03'},
  {id:'ngajiyuk',name:['Ngaji Yuk!'],category:'Aplikasi web pendidikan',url:'ngajiyuk.sdilbanisalehsetu.com',image:'projects/ngajiyuk.webp',mobile:'projects/ngajiyuk-mobile.webp',detail:'projects/ngajiyuk-detail-1.webp',caption:['Kebutuhan khusus.','Pengalaman yang terarah.'],light:true,number:'04'},
];

export const film = {fps:30,durationSeconds:60,frames:1800,output:'output/wasla-informatika-portfolio-60s.mp4'};
