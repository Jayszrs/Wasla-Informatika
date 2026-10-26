export type ReelProject = {
  id:string; name:string; url:string; full?:string; sourceWidth?:number; sourceHeight?:number;
  scrollPixels?:number; boards?:string[]; accent:string;
};

export const reelProjects:ReelProject[]=[
  {id:'cimuning',name:'Cimuning Digital Hub',url:'cimuning.com',full:'reel/cimuning-full.png',sourceWidth:1459,sourceHeight:3862,scrollPixels:1800,accent:'#EF690A'},
  {id:'fazmastone',name:'Fazma Stone',url:'fazmastone.com',full:'reel/fazmastone-full.png',sourceWidth:1802,sourceHeight:10891,scrollPixels:2400,accent:'#749577'},
  {id:'mahameru-baja',name:'Mahameru Baja Indonesia',url:'mahamerubaja.vercel.app',boards:['projects/mahameru-baja.webp','projects/mahameru-baja-detail-2.webp','projects/mahameru-baja-detail-1.webp'],accent:'#D62C3C'},
  {id:'ngajiyuk',name:'Ngaji Yuk!',url:'ngajiyuk.sdilbanisalehsetu.com',full:'reel/ngajiyuk-full.png',sourceWidth:1459,sourceHeight:3077,scrollPixels:1700,accent:'#3A8A68'},
  {id:'ipnubekasi',name:'IPNU Kota Bekasi',url:'ipnubekasi.my.id',full:'reel/ipnubekasi-full.png',sourceWidth:1206,sourceHeight:5494,scrollPixels:1800,accent:'#3D8B32'},
  {id:'sit-permatahati',name:'SIT Permata Hati Bekasi',url:'sitpermatahati.up.railway.app',boards:['projects/sit-permatahati.webp','projects/sit-permatahati-detail-1.webp','projects/sit-permatahati-detail-2.webp'],accent:'#86AA63'},
];

export const reelTiming={durationSeconds:35,fps:30,frames:1050,bpm:120,framesPerBeat:15};
