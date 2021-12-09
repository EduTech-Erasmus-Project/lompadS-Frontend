import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ObjOptions } from 'src/app/modelo/objOptions';
import { LompadService } from '../../servicios/lompad.service';

import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-tecnica',
  templateUrl: './tecnica.component.html',
  styleUrls: ['./tecnica.component.css']
})
export class TecnicaComponent implements OnInit {
  tiposOr:any[];
  tiposSystem:any[];
  tiposNavegadores:any[];
  tiposActual:any[];

  tiposFormatosDigitales:any[];

  objTecnica:any;
  req_tipo_select:string;
  nombreSelect:string;

  formatType: any;
  formatDigitalTypeSelected: any;
  formatDigitalSubtypeSelected: any;

  isDigitalSelected:boolean;


  years:number;
  months:number;
  days:number;
  hours:number;
  minutes:number;

  ObjOptions:ObjOptions=new ObjOptions();

  constructor(
    private componentePrincipal: AppComponent,
    private lompadservice:LompadService
  ) { }
   
  loadDatos(){
    this.objTecnica = this.lompadservice.objPricipal['DATA']['technical'];

    try {
      this.castTime(this.objTecnica['Duration']); 
    } catch (error) {
      console.log("Controlado: años meses ...etc");
    }
  }

  castTime(param:string){
    var one = param.split('DT')[0];
    var dos = param.split('DT')[1];

    one=one.substr(1,one.length);

    this.years =+ one.split("Y")[0];
    this.months =+ one.split("Y")[1].split("M")[0];      
    this.days =+ one.split("Y")[1].split("M")[1];

    this.hours =+ dos.split("H")[0];
    this.minutes =+ dos.split("H")[1].split('M')[0];
  }

  saveTime(){
    this.objTecnica['Duration'] = "P"+this.years+"Y"+this.months+"M"+this.days+"DT"+this.hours+"H"+this.minutes+"M";
    // console.log("P"+this.years+"Y"+this.months+"M"+this.days+"DT"+this.hours+"H"+this.minutes+"M")
  }
   
  ngOnDestroy():void {
    console.log("Destroy tecnica"); 
    this.saveTime();
    this.lompadservice.objPricipal['DATA']['technical'] = this.objTecnica;
    this.lompadservice.saveObjectLompad(this.objTecnica, "technical");  
  }
     
  ngOnInit(): void {
    this.loadDatos();

    this.tiposOr = [
      {label: 'Sistema Operativo', value:  'operating system', code: 'sys_o'},
      {label: 'Navegador', value:  'browser', code: 'nav'}    
    ];

    this.tiposSystem = [
      {label: 'pc-dos', value:  'pc-dos', code: 'pc-dos'},
      {label: 'ms-windows', value:  'ms-windows', code: 'ms-windows'},    
      {label: 'macos', value:  'macos', code: 'macos'},    
      {label: 'unix', value:  'unix', code: 'unix'},    
      {label: 'multi-os', value:  'multi-os', code: 'multi-os'},    
      {label: 'ninguno', value:  'none', code: 'none'}
    ];

    this.tiposNavegadores = [
      {label: 'cualquiera', value: 'any', code: 'any'},
      {label: 'netscape communicator', value: 'netscape communicator', code: 'net-com'},
      {label: 'ms-internet explorer', value: 'ms-internet explorer', code: 'ms-ie'},
      {label: 'opera', value: 'opera', code: 'ope'},
      {label: 'amaya', value: 'amaya', code: 'ama'}
    ];

    this.tiposFormatosDigitales = [
      {label: 'text', value: [
        {label: 'calendar', value: 'text/calendar', code: 'calendar'},
        {label: 'css', value: 'text/css', code: 'css'},
        {label: 'directory', value: 'text/directory', code: 'directory'},
        {label: 'enriched', value: 'text/enriched', code: 'enriched'},
        {label: 'html', value: 'text/html', code: 'html'},
        {label: 'parityfec', value: 'text/parityfec', code: 'parityfec'},
        {label: 'plain', value: 'text/plain', code: 'plain'},
        {label: 'prs.lines.tag', value: 'text/prs.lines.tag', code: 'prs.lines.tag'},
        {label: 'rfc822-headers', value: 'text/rfc822-headers', code: 'rfc822-headers'},
        {label: 'richtext', value: 'text/richtext', code: 'richtext'},
        {label: 'rtf', value: 'text/rtf', code: 'rtf'},
        {label: 'sgmi', value: 'text/sgmi', code: 'sgmi'},
        {label: 't140', value: 'text/t140', code: 't140'},
        {label: 'tab-separated-values', value: 'text/tab-separated-values', code: 'tab-separated-values'},
        {label: 'url-list', value: 'text/url-list', code: 'url-list'},
        {label: 'vnd.DMClientScript', value: 'text/vnd.DMClientScript', code: 'vnd.DMClientScript'},
        {label: 'vnd.IPTC.NITF', value: 'text/vnd.IPTC.NITF', code: 'vnd.IPTC.NITF'},
        {label: 'vnd.IPTC.NewsML', value: 'text/vnd.IPTC.NewsML', code: 'vnd.IPTC.NewsML'},
        {label: 'vnd.abc', value: 'text/vnd.abc', code: 'vnd.abc'},
        {label: 'vnd.curl', value: 'text/vnd.curl', code: 'vnd.curl'},
        {label: 'vnd.fly', value: 'text/vnd.fly', code: 'vnd.fly'},
        {label: 'vnd.fmi.flexstor', value: 'text/vnd.fmi.flexstor', code: 'vnd.fmi.flexstor'},
        {label: 'vnd.in3d.3dmi', value: 'text/vnd.in3d.3dmi', code: 'vnd.in3d.3dmi'},
        {label: 'vnd.in3d.spot', value: 'text/vnd.in3d.spot', code: 'vnd.in3d.spot'},
        {label: 'vnd.latex-z', value: 'text/vnd.latex-z', code: 'vnd.latex-z'},
        {label: 'vnd.motorola.reflex', value: 'text/vnd.motorola.reflex', code: 'vnd.motorola.reflex'},
        {label: 'vnd.ms-mediapackage', value: 'text/vnd.ms-mediapackage', code: 'vnd.ms-mediapackage'},
        {label: 'vnd.wap.si', value: 'text/vnd.wap.si', code: 'vnd.wap.si'},
        {label: 'vnd.wap.sl', value: 'text/vnd.wap.sl', code: 'vnd.wap.sl'},
        {label: 'vnd.wap.wml', value: 'text/vnd.wap.wml', code: 'vnd.wap.wml'},
        {label: 'vnd.wap.wmlscript', value: 'text/vnd.wap.wmlscript', code: 'vnd.wap.wmlscript'},
        {label: 'xml', value: 'text/xml', code: 'xml'},
        {label: 'xml-external-parsed-entity', value: 'text/xml-external-parsed-entity', code: 'xml-external-parsed-entity'}
      ], code: 'text'},
      {label: 'image', value: [
        {label: 'cgm', value: 'image/cgm', code: 'cgm'},
        {label: 'g3fax', value: 'image/g3fax', code: 'g3fax'},
        {label: 'gif', value: 'image/gif', code: 'gif'},
        {label: 'ief', value: 'image/ief', code: 'ief'},
        {label: 'jpeg', value: 'image/jpeg', code: 'jpeg'},
        {label: 'naplps', value: 'image/naplps', code: 'naplps'},
        {label: 'png', value: 'image/png', code: 'png'},
        {label: 'prs.btif', value: 'image/prs.btif', code: 'prs.btif'},
        {label: 'prs.pti', value: 'image/prs.pti', code: 'prs.pti'},
        {label: 'tiff', value: 'image/tiff', code: 'tiff'},
        {label: 'vnd.cns.inf2', value: 'image/vnd.cns.inf2', code: 'vnd.cns.inf2'},
        {label: 'vnd.dwg', value: 'image/vnd.dwg', code: 'vnd.dwg'},
        {label: 'vnd.dxf', value: 'image/vnd.dxf', code: 'vnd.dxf'},
        {label: 'vnd.fastbidsheet', value: 'image/vnd.fastbidsheet', code: 'vnd.fastbidsheet'},
        {label: 'vnd.fpx', value: 'image/vnd.fpx', code: 'vnd.fpx'},
        {label: 'vnd.fst', value: 'image/vnd.fst', code: 'vnd.fst'},
        {label: 'vnd.fujixerox.edmics-mmr', value: 'image/vnd.fujixerox.edmics-mmr', code: 'vnd.fujixerox.edmics-mmr'},
        {label: 'vnd.fujixerox.edmics-rlc', value: 'image/vnd.fujixerox.edmics-rlc', code: 'vnd.fujixerox.edmics-rlc'},
        {label: 'vnd.mix', value: 'image/vnd.mix', code: 'vnd.mix'},
        {label: 'vnd.net-fpx', value: 'image/vnd.net-fpx', code: 'vnd.net-fpx'},
        {label: 'vnd.svf', value: 'image/vnd.svf', code: 'vnd.svf'},
        {label: 'vnd.wap.wbmp', value: 'image/vnd.wap.wbmp', code: 'vnd.wap.wbmp'},
        {label: 'vnd.xiff', value: 'image/vnd.xiff', code: 'vnd.xiff'}
      ], code: 'image'},
      {label: 'video', value: [
        {label: 'MP4V-ES', value: 'video/MP4V-ES', code: 'MP4V-ES'},
        {label: 'mpeg', value: 'video/mpeg', code: 'mpeg'},
        {label: 'parityfec', value: 'video/parityfec', code: 'parityfec'},
        {label: 'pointer', value: 'video/pointer', code: 'pointer'},
        {label: 'quicktime', value: 'video/quicktime', code: 'quicktime'},
        {label: 'vnd.fvt', value: 'video/vnd.fvt', code: 'vnd.fvt'},
        {label: 'vnd.motorola.video', value: 'video/vnd.motorola.video', code: 'vnd.motorola.video'},
        {label: 'vnd.motorola.videop', value: 'video/vnd.motorola.videop', code: 'vnd.motorola.videop'},
        {label: 'vnd.mpegurl', value: 'video/vnd.mpegurl', code: 'vnd.mpegurl'},
        {label: 'vnd.nokia.interleaved-multimedia', value: 'video/vnd.nokia.interleaved-multimedia', code: 'vnd.nokia.interleaved-multimedia'},
        {label: 'vnd.vivo', value: 'video/vnd.vivo', code: 'vnd.vivo'}
      ], code: 'video'},
      {label: 'application', value: [
        {label: 'EDI-Consent', value: 'application/EDI-Consent', code: 'EDI-Consent'},
        {label: 'EDI-X12', value: 'application/EDI-X12', code: 'EDI-X12'},
        {label: 'EDIFACT', value: 'application/EDIFACT', code: 'EDIFACT'},
        {label: 'activemessage', value: 'application/activemessage', code: 'activemessage'},
        {label: 'andrew-inset', value: 'application/andrew-inset', code: 'andrew-inset'},
        {label: 'applefile', value: 'application/applefile', code: 'applefile'},
        {label: 'atomicmail', value: 'application/atomicmail', code: 'atomicmail'},
        {label: 'batch-SMTP', value: 'application/batch-SMTP', code: 'batch-SMTP'},
        {label: 'beep+xml', value: 'application/beep+xml', code: 'beep+xml'},
        {label: 'cals-1840', value: 'application/cals-1840', code: 'cals-1840'},
        {label: 'commonground', value: 'application/commonground', code: 'commonground'},
        {label: 'cybercash', value: 'application/cybercash', code: 'cybercash'},
        {label: 'dca-rft', value: 'application/dca-rft', code: 'dca-rft'},
        {label: 'dec-dx', value: 'application/dec-dx', code: 'dec-dx'},
        {label: 'dvcs', value: 'application/dvcs', code: 'dvcs'},
        {label: 'eshop', value: 'application/eshop', code: 'eshop'},
        {label: 'font-tdpfr', value: 'application/font-tdpfr', code: 'font-tdpfr'},
        {label: 'http', value: 'application/http', code: 'http'},
        {label: 'hyperstudio', value: 'application/hyperstudio', code: 'hyperstudio'},
        {label: 'iges', value: 'application/iges', code: 'iges'},
        {label: 'index', value: 'application/index', code: 'index'},
        {label: 'index.cmd', value: 'application/index.cmd', code: 'index.cmd'},
        {label: 'index.obj', value: 'application/index.obj', code: 'index.obj'},
        {label: 'index.response', value: 'application/index.response', code: 'index.response'},
        {label: 'index.vnd', value: 'application/index.vnd', code: 'index.vnd'},
        {label: 'iotp', value: 'application/iotp', code: 'iotp'},
        {label: 'ipp', value: 'application/ipp', code: 'ipp'},
        {label: 'isup', value: 'application/isup', code: 'isup'},
        {label: 'mac-binhex40', value: 'application/mac-binhex40', code: 'mac-binhex40'},
        {label: 'macwriteii', value: 'application/macwriteii', code: 'macwriteii'},
        {label: 'marc', value: 'application/marc', code: 'marc'},
        {label: 'mathematica', value: 'application/mathematica', code: 'mathematica'},
        {label: 'msword', value: 'application/msword', code: 'msword'},
        {label: 'news-message-id', value: 'application/news-message-id', code: 'news-message-id'},
        {label: 'news-transmission', value: 'application/news-transmission', code: 'news-transmission'},
        {label: 'ocsp-request', value: 'application/ocsp-request', code: 'ocsp-request'},
        {label: 'ocsp-response', value: 'application/ocsp-response', code: 'ocsp-response'},
        {label: 'octet-stream', value: 'application/octet-stream', code: 'octet-stream'},
        {label: 'oda', value: 'application/oda', code: 'oda'},
        {label: 'parityfec', value: 'application/parityfec', code: 'parityfec'},
        {label: 'pdf', value: 'application/pdf', code: 'pdf'},
        {label: 'pgp-encrypted', value: 'application/pgp-encrypted', code: 'pgp-encrypted'},
        {label: 'pgp-keys', value: 'application/pgp-keys', code: 'pgp-keys'},
        {label: 'pgp-signature', value: 'application/pgp-signature', code: 'pgp-signature'},
        {label: 'pkcs10', value: 'application/pkcs10', code: 'pkcs10'},
        {label: 'pkcs7-mime', value: 'application/pkcs7-mime', code: 'pkcs7-mime'},
        {label: 'pkcs7-signature', value: 'application/pkcs7-signature', code: 'pkcs7-signature'},
        {label: 'pkix-cert', value: 'application/pkix-cert', code: 'pkix-cert'},
        {label: 'pkix-crl', value: 'application/pkix-crl', code: 'pkix-crl'},
        {label: 'pkixcmp', value: 'application/pkixcmp', code: 'pkixcmp'},
        {label: 'postscript', value: 'application/postscript', code: 'postscript'},
        {label: 'prs.alvestrand.titrax-sheet', value: 'application/prs.alvestrand.titrax-sheet', code: 'prs.alvestrand.titrax-sheet'},
        {label: 'prs.cww', value: 'application/prs.cww', code: 'prs.cww'},
        {label: 'prs.nprend', value: 'application/prs.nprend', code: 'prs.nprend'},
        {label: 'qsig', value: 'application/qsig', code: 'qsig'},
        {label: 'remote-printing', value: 'application/remote-printing', code: 'remote-printing'},
        {label: 'riscos', value: 'application/riscos', code: 'riscos'},
        {label: 'rtf', value: 'application/rtf', code: 'rtf'},
        {label: 'sdp', value: 'application/sdp', code: 'sdp'},
        {label: 'set-payment', value: 'application/set-payment', code: 'set-payment'},
        {label: 'set-payment-initiation', value: 'application/set-payment-initiation', code: 'set-payment-initiation'},
        {label: 'set-registration', value: 'application/set-registration', code: 'set-registration'},
        {label: 'set-registration-initiation', value: 'application/set-registration-initiation', code: 'set-registration-initiation'},
        {label: 'sgml', value: 'application/sgml', code: 'sgml'},
        {label: 'sgml-open-catalog', value: 'application/sgml-open-catalog', code: 'sgml-open-catalog'},
        {label: 'sieve', value: 'application/sieve', code: 'sieve'},
        {label: 'slate', value: 'application/slate', code: 'slate'},
        {label: 'timestamp-query', value: 'application/timestamp-query', code: 'timestamp-query'},
        {label: 'timestamp-reply', value: 'application/timestamp-reply', code: 'timestamp-reply'},
        {label: 'vemmi', value: 'application/vemmi', code: 'vemmi'},
        {label: 'vnd.$commerce_battlelle', value: 'application/vnd.$commerce_battlelle', code: 'vnd.$commerce_battlelle'},
        {label: 'vnd.3M.Post-it-Notes', value: 'application/vnd.3M.Post-it-Notes', code: 'vnd.3M.Post-it-Notes'},
        {label: 'vnd.FloGraphit', value: 'application/vnd.FloGraphit', code: 'vnd.FloGraphit'},
        {label: 'vnd.Mobius.DAF', value: 'application/vnd.Mobius.DAF', code: 'vnd.Mobius.DAF'},
        {label: 'vnd.Mobius.DIS', value: 'application/vnd.Mobius.DIS', code: 'vnd.Mobius.DIS'},
        {label: 'vnd.Mobius.MBK', value: 'application/vnd.Mobius.MBK', code: 'vnd.Mobius.MBK'},
        {label: 'vnd.Mobius.MQY', value: 'application/vnd.Mobius.MQY', code: 'vnd.Mobius.MQY'},
        {label: 'vnd.Mobius.MSL', value: 'application/vnd.Mobius.MSL', code: 'vnd.Mobius.MSL'},
        {label: 'vnd.Mobius.PLC', value: 'application/vnd.Mobius.PLC', code: 'vnd.Mobius.PLC'},
        {label: 'vnd.Mobius.TXF', value: 'application/vnd.Mobius.TXF', code: 'vnd.Mobius.TXF'},
        {label: 'vnd.accpac.simply.aso', value: 'application/vnd.accpac.simply.aso', code: 'vnd.accpac.simply.aso'},
        {label: 'vnd.accpac.simply.imp', value: 'application/vnd.accpac.simply.imp', code: 'vnd.accpac.simply.imp'},
        {label: 'vnd.acucobol', value: 'application/vnd.acucobol', code: 'vnd.acucobol'},
        {label: 'vnd.aether.imp', value: 'application/vnd.aether.imp', code: 'vnd.aether.imp'},
        {label: 'vnd.answer-web-certificate-issue-initiation', value: 'application/vnd.answer-web-certificate-issue-initiation', code: 'vnd.answer-web-certificate-issue-initiation'},
        {label: 'vnd.answer-web-funds-transfer-initiation', value: 'application/vnd.answer-web-funds-transfer-initiation', code: 'vnd.answer-web-funds-transfer-initiation'},
        {label: 'vnd.audiograph', value: 'application/vnd.audiograph', code: 'vnd.audiograph'},
        {label: 'vnd.bmi', value: 'application/vnd.bmi', code: 'vnd.bmi'},
        {label: 'vnd.bussinesobjects', value: 'application/vnd.bussinesobjects', code: 'vnd.bussinesobjects'},
        {label: 'vnd.canon-cpdl', value: 'application/vnd.canon-cpdl', code: 'vnd.canon-cpdl'},
        {label: 'vnd.canon-lips', value: 'application/vnd.canon-lips', code: 'vnd.canon-lips'},
        {label: 'vnd.claymore', value: 'application/vnd.claymore', code: 'vnd.claymore'},
        {label: 'vnd.commonspace', value: 'application/vnd.commonspace', code: 'vnd.commonspace'},
        {label: 'vnd.comsocaller', value: 'application/vnd.comsocaller', code: 'vnd.comsocaller'},
        {label: 'vnd.contact.cmsg', value: 'application/vnd.contact.cmsg', code: 'vnd.contact.cmsg'},
        {label: 'vnd.ctc-posml', value: 'application/vnd.ctc-posml', code: 'vnd.ctc-posml'},
        {label: 'vnd.cups-postscript', value: 'application/vnd.cups-postscript', code: 'vnd.cups-postscript'},
        {label: 'vnd.cups-raster', value: 'application/vnd.cups-raster', code: 'vnd.cups-raster'},
        {label: 'vnd.cups-raw', value: 'application/vnd.cups-raw', code: 'vnd.cups-raw'},
        {label: 'vnd.cybank', value: 'application/vnd.cybank', code: 'vnd.cybank'},
        {label: 'vnd.dna', value: 'application/vnd.dna', code: 'vnd.dna'},
        {label: 'vnd.dpgraph', value: 'application/vnd.dpgraph', code: 'vnd.dpgraph'},
        {label: 'vnd.dxr', value: 'application/vnd.dxr', code: 'vnd.dxr'},
        {label: 'vnd.ecdis-update', value: 'application/vnd.ecdis-update', code: 'vnd.ecdis-update'},
        {label: 'vnd.ecowin.chart', value: 'application/vnd.ecowin.chart', code: 'vnd.ecowin.chart'},
        {label: 'vnd.ecowin.filerequest', value: 'application/vnd.ecowin.filerequest', code: 'vnd.ecowin.filerequest'},
        {label: 'vnd.ecowin.fileupdate', value: 'application/vnd.ecowin.fileupdate', code: 'vnd.ecowin.fileupdate'},
        {label: 'vnd.ecowin.series', value: 'application/vnd.ecowin.series', code: 'vnd.ecowin.series'},
        {label: 'vnd.ecowin.seriesrequest', value: 'application/vnd.ecowin.seriesrequest', code: 'vnd.ecowin.seriesrequest'},
        {label: 'vnd.ecowin.seriesupdate', value: 'application/vnd.ecowin.seriesupdate', code: 'vnd.ecowin.seriesupdate'},
        {label: 'vnd.enliven', value: 'application/vnd.enliven', code: 'vnd.enliven'},
        {label: 'vnd.epson.esf', value: 'application/vnd.epson.esf', code: 'vnd.epson.esf'},
        {label: 'vnd.epson.msf', value: 'application/vnd.epson.msf', code: 'vnd.epson.msf'},
        {label: 'vnd.epson.quickanime', value: 'application/vnd.epson.quickanime', code: 'vnd.epson.quickanime'},
        {label: 'vnd.epson.salt', value: 'application/vnd.epson.salt', code: 'vnd.epson.salt'},
        {label: 'vnd.epson.ssf', value: 'application/vnd.epson.ssf', code: 'vnd.epson.ssf'},
        {label: 'vnd.ericsson.quickcall', value: 'application/vnd.ericsson.quickcall', code: 'vnd.ericsson.quickcall'},
        {label: 'vnd.eudora.data', value: 'application/vnd.eudora.data', code: 'vnd.eudora.data'},
        {label: 'vnd.fdf', value: 'application/vnd.fdf', code: 'vnd.fdf'},
        {label: 'vnd.ffsns', value: 'application/vnd.ffsns', code: 'vnd.ffsns'},
        {label: 'vnd.framemarker', value: 'application/vnd.framemarker', code: 'vnd.framemarker'},
        {label: 'vnd.fsc.weblaunch', value: 'application/vnd.fsc.weblaunch', code: 'vnd.fsc.weblaunch'},
        {label: 'vnd.fujitsu.oasys', value: 'application/vnd.fujitsu.oasys', code: 'vnd.fujitsu.oasys'},
        {label: 'vnd.fujitsu.oasys2', value: 'application/vnd.fujitsu.oasys2', code: 'vnd.fujitsu.oasys2'},
        {label: 'vnd.fujitsu.oasys3', value: 'application/vnd.fujitsu.oasys3', code: 'vnd.fujitsu.oasys3'},
        {label: 'vnd.fujitsu.oasysgp', value: 'application/vnd.fujitsu.oasysgp', code: 'vnd.fujitsu.oasysgp'},
        {label: 'vnd.fujitsu.oasysprs', value: 'application/vnd.fujitsu.oasysprs', code: 'vnd.fujitsu.oasysprs'},
        {label: 'vnd.fujixerox.ddd', value: 'application/vnd.fujixerox.ddd', code: 'vnd.fujixerox.ddd'},
        {label: 'vnd.fujixerox.docuworks', value: 'application/vnd.fujixerox.docuworks', code: 'vnd.fujixerox.docuworks'},
        {label: 'vnd.fujixerox.docuworks.binder', value: 'application/vnd.fujixerox.docuworks.binder', code: 'vnd.fujixerox.docuworks.binder'},
        {label: 'vnd.fut-misnet', value: 'application/vnd.fut-misnet', code: 'vnd.fut-misnet'},
        {label: 'vnd.grafeq', value: 'application/vnd.grafeq', code: 'vnd.grafeq'},
        {label: 'vnd.groove-account', value: 'application/vnd.groove-account', code: 'vnd.groove-account'},
        {label: 'vnd.groove-identity-message', value: 'application/vnd.groove-identity-message', code: 'vnd.groove-identity-message'},
        {label: 'vnd.groove-injector', value: 'application/vnd.groove-injector', code: 'vnd.groove-injector'},
        {label: 'vnd.groove-tool-message', value: 'application/vnd.groove-tool-message', code: 'vnd.groove-tool-message'},
        {label: 'vnd.groove-tool-template', value: 'application/vnd.groove-tool-template', code: 'vnd.groove-tool-template'},
        {label: 'vnd.groove-vcard', value: 'application/vnd.groove-vcard', code: 'vnd.groove-vcard'},
        {label: 'vnd.hhe.lesson-player', value: 'application/vnd.hhe.lesson-player', code: 'vnd.hhe.lesson-player'},
        {label: 'vnd.hp-HPGL', value: 'application/vnd.hp-HPGL', code: 'vnd.hp-HPGL'},
        {label: 'vnd.hp-PCL', value: 'application/vnd.hp-PCL', code: 'vnd.hp-PCL'},
        {label: 'vnd.hp-PCLXL', value: 'application/vnd.hp-PCLXL', code: 'vnd.hp-PCLXL'},
        {label: 'vnd.hp-hpid', value: 'application/vnd.hp-hpid', code: 'vnd.hp-hpid'},
        {label: 'vnd.hp-hps', value: 'application/vnd.hp-hps', code: 'vnd.hp-hps'},
        {label: 'vnd.httphone', value: 'application/vnd.httphone', code: 'vnd.httphone'},
        {label: 'vnd.hzn-3d-crossword', value: 'application/vnd.hzn-3d-crossword', code: 'vnd.hzn-3d-crossword'},
        {label: 'vnd.ibm.MiniPay', value: 'application/vnd.ibm.MiniPay', code: 'vnd.ibm.MiniPay'},
        {label: 'vnd.ibm.afplinedata', value: 'application/vnd.ibm.afplinedata', code: 'vnd.ibm.afplinedata'},
        {label: 'vnd.ibm.modcap', value: 'application/vnd.ibm.modcap', code: 'vnd.ibm.modcap'},
        {label: 'vnd.informix-visionary', value: 'application/vnd.informix-visionary', code: 'vnd.informix-visionary'},
        {label: 'vnd.intercon.formnet', value: 'application/vnd.intercon.formnet', code: 'vnd.intercon.formnet'},
        {label: 'vnd.intertrust.digibox', value: 'application/vnd.intertrust.digibox', code: 'vnd.intertrust.digibox'},
        {label: 'vnd.intertrust.nncp', value: 'application/vnd.intertrust.nncp', code: 'vnd.intertrust.nncp'},
        {label: 'vnd.intu.qbo', value: 'application/vnd.intu.qbo', code: 'vnd.intu.qbo'},
        {label: 'vnd.intu.qfx', value: 'application/vnd.intu.qfx', code: 'vnd.intu.qfx'},
        {label: 'vnd.irepository.package+xml', value: 'application/vnd.irepository.package+xml', code: 'vnd.irepository.package+xml'},
        {label: 'vnd.is-xrp', value: 'application/vnd.is-xrp', code: 'vnd.is-xrp'},
        {label: 'vnd.japannet-directory-service', value: 'application/vnd.japannet-directory-service', code: 'vnd.japannet-directory-service'},
        {label: 'vnd.japannet-jpnstore-wakeup', value: 'application/vnd.japannet-jpnstore-wakeup', code: 'vnd.japannet-jpnstore-wakeup'},
        {label: 'vnd.japannet-payment-wakeup', value: 'application/vnd.japannet-payment-wakeup', code: 'vnd.japannet-payment-wakeup'},
        {label: 'vnd.japannet-registration', value: 'application/vnd.japannet-registration', code: 'vnd.japannet-registration'},
        {label: 'vnd.japannet-registration-wakeup', value: 'application/vnd.japannet-registration-wakeup', code: 'vnd.japannet-registration-wakeup'},
        {label: 'vnd.japannet-setstore-wakeup', value: 'application/vnd.japannet-setstore-wakeup', code: 'vnd.japannet-setstore-wakeup'},
        {label: 'vnd.japannet-verification', value: 'application/vnd.japannet-verification', code: 'vnd.japannet-verification'},
        {label: 'vnd.japannet-verification-wakeup', value: 'application/vnd.japannet-verification-wakeup', code: 'vnd.japannet-verification-wakeup'},
        {label: 'vnd.koan', value: 'application/vnd.koan', code: 'vnd.koan'},
        {label: 'vnd.lotus-1-2-3', value: 'application/vnd.lotus-1-2-3', code: 'vnd.lotus-1-2-3'},
        {label: 'vnd.lotus-approach', value: 'application/vnd.lotus-approach', code: 'vnd.lotus-approach'},
        {label: 'vnd.lotus-freelance', value: 'application/vnd.lotus-freelance', code: 'vnd.lotus-freelance'},
        {label: 'vnd.lotus-notes', value: 'application/vnd.lotus-notes', code: 'vnd.lotus-notes'},
        {label: 'vnd.lotus-organizer', value: 'application/vnd.lotus-organizer', code: 'vnd.lotus-organizer'},
        {label: 'vnd.lotus-screencam', value: 'application/vnd.lotus-screencam', code: 'vnd.lotus-screencam'},
        {label: 'vnd.lotus-wordpro', value: 'application/vnd.lotus-wordpro', code: 'vnd.lotus-wordpro'},
        {label: 'vnd.mcd', value: 'application/vnd.mcd', code: 'vnd.mcd'},
        {label: 'vnd.mediastation.cdkey', value: 'application/vnd.mediastation.cdkey', code: 'vnd.mediastation.cdkey'},
        {label: 'vnd.meridian-slingshot', value: 'application/vnd.meridian-slingshot', code: 'vnd.meridian-slingshot'},
        {label: 'vnd.mif', value: 'application/vnd.mif', code: 'vnd.mif'},
        {label: 'vnd.minisoft-hp3000-save', value: 'application/vnd.minisoft-hp3000-save', code: 'vnd.minisoft-hp3000-save'},
        {label: 'vnd.mitsubishi.misty-guard.trustweb', value: 'application/vnd.mitsubishi.misty-guard.trustweb', code: 'vnd.mitsubishi.misty-guard.trustweb'},
        {label: 'vnd.motorola.flexsuite', value: 'application/vnd.motorola.flexsuite', code: 'vnd.motorola.flexsuite'},
        {label: 'vnd.motorola.flexsuite.adsi', value: 'application/vnd.motorola.flexsuite.adsi', code: 'vnd.motorola.flexsuite.adsi'},
        {label: 'vnd.motorola.flexsuite.fis', value: 'application/vnd.motorola.flexsuite.fis', code: 'vnd.motorola.flexsuite.fis'},
        {label: 'vnd.motorola.flexsuite.gotap', value: 'application/vnd.motorola.flexsuite.gotap', code: 'vnd.motorola.flexsuite.gotap'},
        {label: 'vnd.motorola.flexsuite.kmr', value: 'application/vnd.motorola.flexsuite.kmr', code: 'vnd.motorola.flexsuite.kmr'},
        {label: 'vnd.motorola.flexsuite.ttc', value: 'application/vnd.motorola.flexsuite.ttc', code: 'vnd.motorola.flexsuite.ttc'},
        {label: 'vnd.motorola.flexsuite.wem', value: 'application/vnd.motorola.flexsuite.wem', code: 'vnd.motorola.flexsuite.wem'},
        {label: 'vnd.mozilla.xul+xml', value: 'application/vnd.mozilla.xul+xml', code: 'vnd.mozilla.xul+xml'},
        {label: 'vnd.ms-artgalry', value: 'application/vnd.ms-artgalry', code: 'vnd.ms-artgalry'},
        {label: 'vnd.ms-asf', value: 'application/vnd.ms-asf', code: 'vnd.ms-asf'},
        {label: 'vnd.ms-excel', value: 'application/vnd.ms-excel', code: 'vnd.ms-excel'},
        {label: 'vnd.ms-lrm', value: 'application/vnd.ms-lrm', code: 'vnd.ms-lrm'},
        {label: 'vnd.ms-powerpoint', value: 'application/vnd.ms-powerpoint', code: 'vnd.ms-powerpoint'},
        {label: 'vnd.ms-project', value: 'application/vnd.ms-project', code: 'vnd.ms-project'},
        {label: 'vnd.ms-tnef', value: 'application/vnd.ms-tnef', code: 'vnd.ms-tnef'},
        {label: 'vnd.ms-works', value: 'application/vnd.ms-works', code: 'vnd.ms-works'},
        {label: 'vnd.mseq', value: 'application/vnd.mseq', code: 'vnd.mseq'},
        {label: 'vnd.msing', value: 'application/vnd.msing', code: 'vnd.msing'},
        {label: 'vnd.music-niff', value: 'application/vnd.music-niff', code: 'vnd.music-niff'},
        {label: 'vnd.musician', value: 'application/vnd.musician', code: 'vnd.musician'},
        {label: 'vnd.netfpx', value: 'application/vnd.netfpx', code: 'vnd.netfpx'},
        {label: 'vnd.noblenet-directory', value: 'application/vnd.noblenet-directory', code: 'vnd.noblenet-directory'},
        {label: 'vnd.noblenet-sealer', value: 'application/vnd.noblenet-sealer', code: 'vnd.noblenet-sealer'},
        {label: 'vnd.noblenet-web', value: 'application/vnd.noblenet-web', code: 'vnd.noblenet-web'},
        {label: 'vnd.novadigm.EDM', value: 'application/vnd.novadigm.EDM', code: 'vnd.novadigm.EDM'},
        {label: 'vnd.novadigm.EDX', value: 'application/vnd.novadigm.EDX', code: 'vnd.novadigm.EDX'},
        {label: 'vnd.novadigm.EXT', value: 'application/vnd.novadigm.EXT', code: 'vnd.novadigm.EXT'},
        {label: 'vnd.osa.netdeploy', value: 'application/vnd.osa.netdeploy', code: 'vnd.osa.netdeploy'},
        {label: 'vnd.palm', value: 'application/vnd.palm', code: 'vnd.palm'},
        {label: 'vnd.pg.format', value: 'application/vnd.pg.format', code: 'vnd.pg.format'},
        {label: 'vnd.pg.osasli', value: 'application/vnd.pg.osasli', code: 'vnd.pg.osasli'},
        {label: 'vnd.powerbuilder6', value: 'application/vnd.powerbuilder6', code: 'vnd.powerbuilder6'},
        {label: 'vnd.powerbuilder6-s', value: 'application/vnd.powerbuilder6-s', code: 'vnd.powerbuilder6-s'},
        {label: 'vnd.powerbuilder7', value: 'application/vnd.powerbuilder7', code: 'vnd.powerbuilder7'},
        {label: 'vnd.powerbuilder7-s', value: 'application/vnd.powerbuilder7-s', code: 'vnd.powerbuilder7-s'},
        {label: 'vnd.powerbuilder75', value: 'application/vnd.powerbuilder75', code: 'vnd.powerbuilder75'},
        {label: 'vnd.powerbuilder75-s', value: 'application/vnd.powerbuilder75-s', code: 'vnd.powerbuilder75-s'},
        {label: 'vnd.previewsystems.box', value: 'application/vnd.previewsystems.box', code: 'vnd.previewsystems.box'},
        {label: 'vnd.publicshare-delta-tree', value: 'application/vnd.publicshare-delta-tree', code: 'vnd.publicshare-delta-tree'},
        {label: 'vnd.pvi.ptid1', value: 'application/vnd.pvi.ptid1', code: 'vnd.pvi.ptid1'},
        {label: 'vnd.pwg-xhtml-print+xml', value: 'application/vnd.pwg-xhtml-print+xml', code: 'vnd.pwg-xhtml-print+xml'},
        {label: 'vnd.rapid', value: 'application/vnd.rapid', code: 'vnd.rapid'},
        {label: 'vnd.s3sms', value: 'application/vnd.s3sms', code: 'vnd.s3sms'},
        {label: 'vnd.seemail', value: 'application/vnd.seemail', code: 'vnd.seemail'},
        {label: 'vnd.shana.informed.formdata', value: 'application/vnd.shana.informed.formdata', code: 'vnd.shana.informed.formdata'},
        {label: 'vnd.shana.informed.formtemplate', value: 'application/vnd.shana.informed.formtemplate', code: 'vnd.shana.informed.formtemplate'},
        {label: 'vnd.shana.informed.interchange', value: 'application/vnd.shana.informed.interchange', code: 'vnd.shana.informed.interchange'},
        {label: 'vnd.shana.informed.package', value: 'application/vnd.shana.informed.package', code: 'vnd.shana.informed.package'},
        {label: 'vnd.sss-cod', value: 'application/vnd.sss-cod', code: 'vnd.sss-cod'},
        {label: 'vnd.sss-dtf', value: 'application/vnd.sss-dtf', code: 'vnd.sss-dtf'},
        {label: 'vnd.sss-ntf', value: 'application/vnd.sss-ntf', code: 'vnd.sss-ntf'},
        {label: 'vnd.street-stream', value: 'application/vnd.street-stream', code: 'vnd.street-stream'},
        {label: 'vnd.svd', value: 'application/vnd.svd', code: 'vnd.svd'},
        {label: 'vnd.swiftview-ics', value: 'application/vnd.swiftview-ics', code: 'vnd.swiftview-ics'},
        {label: 'vnd.triscape.mxs', value: 'application/vnd.triscape.mxs', code: 'vnd.triscape.mxs'},
        {label: 'vnd.trueapp', value: 'application/vnd.trueapp', code: 'vnd.trueapp'},
        {label: 'vnd.truedoc', value: 'application/vnd.truedoc', code: 'vnd.truedoc'},
        {label: 'vnd.tve-trigger', value: 'application/vnd.tve-trigger', code: 'vnd.tve-trigger'},
        {label: 'vnd.ufdl', value: 'application/vnd.ufdl', code: 'vnd.ufdl'},
        {label: 'vnd.uplanet.alert', value: 'application/vnd.uplanet.alert', code: 'vnd.uplanet.alert'},
        {label: 'vnd.uplanet.alert-wbxml', value: 'application/vnd.uplanet.alert-wbxml', code: 'vnd.uplanet.alert-wbxml'},
        {label: 'vnd.uplanet.bearer-choice', value: 'application/vnd.uplanet.bearer-choice', code: 'vnd.uplanet.bearer-choice'},
        {label: 'vnd.uplanet.bearer-choice-wbxml', value: 'application/vnd.uplanet.bearer-choice-wbxml', code: 'vnd.uplanet.bearer-choice-wbxml'},
        {label: 'vnd.uplanet.cacheop', value: 'application/vnd.uplanet.cacheop', code: 'vnd.uplanet.cacheop'},
        {label: 'vnd.uplanet.cacheop-wbxml', value: 'application/vnd.uplanet.cacheop-wbxml', code: 'vnd.uplanet.cacheop-wbxml'},
        {label: 'vnd.uplanet.channel', value: 'application/vnd.uplanet.channel', code: 'vnd.uplanet.channel'},
        {label: 'vnd.uplanet.channel-wbxml', value: 'application/vnd.uplanet.channel-wbxml', code: 'vnd.uplanet.channel-wbxml'},
        {label: 'vnd.uplanet.list', value: 'application/vnd.uplanet.list', code: 'vnd.uplanet.list'},
        {label: 'vnd.uplanet.list-wbxml', value: 'application/vnd.uplanet.list-wbxml', code: 'vnd.uplanet.list-wbxml'},
        {label: 'vnd.uplanet.listcmd', value: 'application/vnd.uplanet.listcmd', code: 'vnd.uplanet.listcmd'},
        {label: 'vnd.uplanet.listcmd-wbxml', value: 'application/vnd.uplanet.listcmd-wbxml', code: 'vnd.uplanet.listcmd-wbxml'},
        {label: 'vnd.uplanet.signal', value: 'application/vnd.uplanet.signal', code: 'vnd.uplanet.signal'},
        {label: 'vnd.vcx', value: 'application/vnd.vcx', code: 'vnd.vcx'},
        {label: 'vnd.vectorworks', value: 'application/vnd.vectorworks', code: 'vnd.vectorworks'},
        {label: 'vnd.vidsoft.vidconferennce', value: 'application/vnd.vidsoft.vidconferennce', code: 'vnd.vidsoft.vidconferennce'},
        {label: 'vnd.visio', value: 'application/vnd.visio', code: 'vnd.visio'},
        {label: 'vnd.vividence.scriptfile', value: 'application/vnd.vividence.scriptfile', code: 'vnd.vividence.scriptfile'},
        {label: 'vnd.wap.sic', value: 'application/vnd.wap.sic', code: 'vnd.wap.sic'},
        {label: 'vnd.wap.slc', value: 'application/vnd.wap.slc', code: 'vnd.wap.slc'},
        {label: 'vnd.wap.wbxml', value: 'application/vnd.wap.wbxml', code: 'vnd.wap.wbxml'},
        {label: 'vnd.wap.wmlc', value: 'application/vnd.wap.wmlc', code: 'vnd.wap.wmlc'},
        {label: 'vnd.wap.wmlscriptc', value: 'application/vnd.wap.wmlscriptc', code: 'vnd.wap.wmlscriptc'},
        {label: 'vnd.webturbo', value: 'application/vnd.webturbo', code: 'vnd.webturbo'},
        {label: 'vnd.wrq-hp3000-labelled', value: 'application/vnd.wrq-hp3000-labelled', code: 'vnd.wrq-hp3000-labelled'},
        {label: 'vnd.wt.stf', value: 'application/vnd.wt.stf', code: 'vnd.wt.stf'},
        {label: 'vnd.xara', value: 'application/vnd.xara', code: 'vnd.xara'},
        {label: 'vnd.xfdl', value: 'application/vnd.xfdl', code: 'vnd.xfdl'},
        {label: 'vnd.yellowriver-custom-menu', value: 'application/vnd.yellowriver-custom-menu', code: 'vnd.yellowriver-custom-menu'},
        {label: 'whoispp-query', value: 'application/whoispp-query', code: 'whoispp-query'},
        {label: 'whoispp-response', value: 'application/whoispp-response', code: 'whoispp-response'},
        {label: 'wita', value: 'application/wita', code: 'wita'},
        {label: 'wordperfect5.1', value: 'application/wordperfect5.1', code: 'wordperfect5.1'},
        {label: 'x400-bp', value: 'application/x400-bp', code: 'x400-bp'},
        {label: 'xml', value: 'application/xml', code: 'xml'},
        {label: 'xml-dtd', value: 'application/xml-dtd', code: 'xml-dtd'},
        {label: 'xml-external-parsed-entity', value: 'application/xml-external-parsed-entity', code: 'xml-external-parsed-entity'},
        {label: 'zip', value: 'application/zip', code: 'zip'}          
      ], code: 'application'},
      {label: 'audio', value: [
        {label: '32kadpcm', value: 'audio/32kadpcm', code: '32kadpcm'},
        {label: 'DAT12', value: 'audio/DAT12', code: 'DAT12'},
        {label: 'G.722.1', value: 'audio/G.722.1', code: 'G.722.1'},
        {label: 'L16', value: 'audio/L16', code: 'L16'},
        {label: 'L20', value: 'audio/L20', code: 'L20'},
        {label: 'L24', value: 'audio/L24', code: 'L24'},
        {label: 'MP4A-LATM', value: 'audio/MP4A-LATM', code: 'MP4A-LATM'},
        {label: 'basic', value: 'audio/basic', code: 'basic'},
        {label: 'mpa-robust', value: 'audio/mpa-robust', code: 'mpa-robust'},
        {label: 'mpeg', value: 'audio/mpeg', code: 'mpeg'},
        {label: 'parityfec', value: 'audio/parityfec', code: 'parityfec'},
        {label: 'prs.sid', value: 'audio/prs.sid', code: 'prs.sid'},
        {label: 'telephone-event', value: 'audio/telephone-event', code: 'telephone-event'},
        {label: 'tone', value: 'audio/tone', code: 'tone'},
        {label: 'vnd.cisco.nse', value: 'audio/vnd.cisco.nse', code: 'vnd.cisco.nse'},
        {label: 'vnd.cns.anp1', value: 'audio/vnd.cns.anp1', code: 'vnd.cns.anp1'},
        {label: 'vnd.cns.inf1', value: 'audio/vnd.cns.inf1', code: 'vnd.cns.inf1'},
        {label: 'vnd.digital-winds', value: 'audio/vnd.digital-winds', code: 'vnd.digital-winds'},
        {label: 'vnd.everad.plj', value: 'audio/vnd.everad.plj', code: 'vnd.everad.plj'},
        {label: 'vnd.lucent.voice', value: 'audio/vnd.lucent.voice', code: 'vnd.lucent.voice'},
        {label: 'vnd.nortel.vbk', value: 'audio/vnd.nortel.vbk', code: 'vnd.nortel.vbk'},
        {label: 'vnd.nuera.ecelp4800', value: 'audio/vnd.nuera.ecelp4800', code: 'vnd.nuera.ecelp4800'},
        {label: 'vnd.nuera.ecelp7470', value: 'audio/vnd.nuera.ecelp7470', code: 'vnd.nuera.ecelp7470'},
        {label: 'vnd.nuera.ecelp9600', value: 'audio/vnd.nuera.ecelp9600', code: 'vnd.nuera.ecelp9600'},
        {label: 'vnd.octel.sbc', value: 'audio/vnd.octel.sbc', code: 'vnd.octel.sbc'},
        {label: 'vnd.qcelp', value: 'audio/vnd.qcelp', code: 'vnd.qcelp'},
        {label: 'vnd.rhetorex.32kadpcm', value: 'audio/vnd.rhetorex.32kadpcm', code: 'vnd.rhetorex.32kadpcm'},
        {label: 'vnd.vmx.cvsd', value: 'audio/vnd.vmx.cvsd', code: 'vnd.vmx.cvsd'}
      ], code: 'audio'},
      {label: 'message', value: [
        {label: 'delivery-status', value: 'message/delivery-status', code: 'delivery-status'},
        {label: 'disposition-notification', value: 'message/disposition-notification', code: 'disposition-notification'},
        {label: 'external-body', value: 'message/external-body', code: 'external-body'},
        {label: 'https', value: 'message/https', code: 'https'},
        {label: 'news', value: 'message/news', code: 'news'},
        {label: 'partial', value: 'message/partial', code: 'partial'},
        {label: 'rfc822', value: 'message/rfc822', code: 'rfc822'},
        {label: 's-http', value: 'message/s-http', code: 's-http'}
      ], code: 'message'},
      {label: 'model', value: [
        {label: 'iges', value: 'model/iges', code: 'iges'},
        {label: 'mesh', value: 'model/mesh', code: 'mesh'},
        {label: 'vnd.dwf', value: 'model/vnd.dwf', code: 'vnd.dwf'},
        {label: 'vnd.flatland.3dml', value: 'model/vnd.flatland.3dml', code: 'vnd.flatland.3dml'},
        {label: 'vnd.gdl', value: 'model/vnd.gdl', code: 'vnd.gdl'},
        {label: 'vnd.gs-dgl', value: 'model/vnd.gs-dgl', code: 'vnd.gs-dgl'},
        {label: 'vnd.gtw', value: 'model/vnd.gtw', code: 'vnd.gtw'},
        {label: 'vnd.mts', value: 'model/vnd.mts', code: 'vnd.mts'},
        {label: 'vnd.parasolid.transmit.binary', value: 'model/vnd.parasolid.transmit.binary', code: 'vnd.parasolid.transmit.binary'},
        {label: 'vnd.parasolid.transmit.text', value: 'model/vnd.parasolid.transmit.text', code: 'vnd.parasolid.transmit.text'},
        {label: 'vnd.vtu', value: 'model/vnd.vtu', code: 'vnd.vtu'},
        {label: 'vrml', value: 'model/vrml', code: 'vrml'}
      ], code: 'model'},
      {label: 'multipart', value: [
        {label: 'alternative', value: 'multipart/alternative', code: 'alternative'},
        {label: 'appledouble', value: 'multipart/appledouble', code: 'appledouble'},
        {label: 'byteranges', value: 'multipart/byteranges', code: 'byteranges'},
        {label: 'digest', value: 'multipart/digest', code: 'digest'},
        {label: 'encrypted', value: 'multipart/encrypted', code: 'encrypted'},
        {label: 'form-data', value: 'multipart/form-data', code: 'form-data'},
        {label: 'header-set', value: 'multipart/header-set', code: 'header-set'},
        {label: 'mixed', value: 'multipart/mixed', code: 'mixed'},
        {label: 'parallel', value: 'multipart/parallel', code: 'parallel'},
        {label: 'related', value: 'multipart/related', code: 'related'},
        {label: 'report', value: 'multipart/report', code: 'report'},
        {label: 'signed', value: 'multipart/signed', code: 'signed'},
        {label: 'voice-message', value: 'multipart/voice-message', code: 'voice-message'}
      ], code: 'multipart'}
    ];   

    this.ObjOptions=this.componentePrincipal.objOptions;
    // this.objTecnica=this.lompadservice.getObjTecnica();
    console.log("DEsde TEcnica: ",this.objTecnica);
    this.req_tipo_select = this.objTecnica['Requirement']['OrComposite']['Type'];
    this.nombreSelect = this.objTecnica['Requirement']['OrComposite']['Name'];

    this.cambiarValoresTipos(this.req_tipo_select);
  }

  cambiarValoresTipos(tipo:any){
    if (tipo == 'operating system') {
      this.tiposActual = this.tiposSystem;
    } else {
      this.tiposActual = this.tiposNavegadores;
    }
  }

  cambioreq_tipo_select(){
    console.log(this.req_tipo_select);
    this.objTecnica['Requirement']['OrComposite']['Type'] = this.req_tipo_select;
    this.cambiarValoresTipos(this.req_tipo_select);
  }

  cambioreq_nombre(){
    console.log(this.nombreSelect);    
    this.objTecnica['Requirement']['OrComposite']['Name'] = this.nombreSelect;
  }

  cambiarTipoFormato(){
    console.log(this.formatType);
    if (this.formatType == 'non-digital'){
      this.isDigitalSelected = false;
      this.objTecnica['Format'] = this.formatType;
    }else {
      this.isDigitalSelected = true;
    }
  }

  cambiarValoresFormatoDigital(){
    console.log(this.formatDigitalTypeSelected);
    console.log(this.formatDigitalSubtypeSelected);
    this.objTecnica['Format'] = this.formatDigitalSubtypeSelected;
  }


}
