/*! For license information please see 479.b451dbbe.chunk.js.LICENSE.txt */
(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[479],{43479:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return N}});var i=s(42982),r=s(1413),a=s(4942),c=s(70885),o=s(72791),l=s(92810),t=s(16871),d=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z' class='ci-primary'/>"],h=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z' class='ci-primary'/>"],u=s(44430),x=s(78983),m=s(48736),j=s(24846),p=s(72426),b=s.n(p),v=(s(45098),s(12254)),f=s(21830),g=s.n(f),y=s(80184),N=function(){var e=(0,t.s0)(),n=(0,m.tN)(),s=n.user,p=n.userInfo,f=n.startFindUser,N=n.startSavingUser,L=(0,m._L)(),_=L.hotels,D=void 0===_?[]:_,C=L.startLoadingHotels,k=L.setActiveHotel,T=(0,m.uz)(),M=T.reservations,S=void 0===M?[]:M,Z=T.startLoadingReservations,R=T.setActiveReservation,I=T.startSavingReservation,w=(0,m.A)(),P=w.rooms,A=w.startFilterRooms,E=new Date,q=(0,o.useState)(!1),O=(0,c.Z)(q,2),Y=O[0],F=O[1],H=(0,o.useState)(!1),V=(0,c.Z)(H,2),B=V[0],z=V[1],$=(0,o.useState)(null),U=(0,c.Z)($,2),W=U[0],X=U[1],G=(0,m.cI)({checkInDate:new Date,checkOutDate:new Date(E.setDate(E.getDate()+1)),search:"",filter:"",range:1e5}),K=(0,c.Z)(G,3),J=K[0],Q=K[1],ee=K[2],ne=J.checkInDate,se=J.checkOutDate,ie=J.search,re=J.filter,ae=J.range,ce=(0,m.cI)({typeDoc:"",ID:null,firstName:"",lastName:"",phone:"",email:"",emergencyContactName:"",emergencyContactPhone:""}),oe=(0,c.Z)(ce,4),le=oe[0],te=oe[1],de=oe[2],he=oe[3],ue=le.typeDoc,xe=le.ID,me=le.firstName,je=le.lastName,pe=le.phone,be=le.email,ve=le.emergencyContactName,fe=le.emergencyContactPhone;(0,o.useEffect)((function(){s.admin&&C(),s.admin&&Z(),!s.admin&&ge(),f(s.uid)}),[]);var ge=function(){var e=(0,a.Z)({checkInDate:ne,checkOutDate:se},re,"price"===re?{$gte:0,$lte:parseInt(ae)}:ie);A(e)},ye=function(){if(!se||!ne)return-1;var e=se.getTime()-ne.getTime();return Math.ceil(e/864e5)},Ne=function(){var e=ye();return e<=0?(null===W||void 0===W?void 0:W.price)||0:e*((null===W||void 0===W?void 0:W.price)||0)};return(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(x.KB,{lg:!0,children:[s.admin?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(x.xH,{className:"mb-2 my-3",children:[(0,y.jsx)(x.bn,{children:(0,y.jsx)("h2",{children:(0,y.jsx)("strong",{children:"RESERVAS"})})}),(0,y.jsx)(x.sl,{color:"info",children:(0,y.jsx)(x.rb,{children:(0,y.jsx)(x.b7,{xs:12,children:(0,y.jsxs)(x.Sx,{align:"middle",responsive:!0,children:[(0,y.jsx)(x.V,{children:(0,y.jsxs)(x.T6,{children:[(0,y.jsx)(x.is,{scope:"col",children:"#"}),(0,y.jsx)(x.is,{scope:"col",children:"Fecha de entrada"}),(0,y.jsx)(x.is,{scope:"col",children:"Fecha de salida"}),(0,y.jsx)(x.is,{scope:"col",children:"Cliente"}),(0,y.jsx)(x.is,{scope:"col",children:"Habitaci\xf3n/Tipo"}),(0,y.jsx)(x.is,{scope:"col",children:"Precio"})]})}),(0,y.jsx)(x.NR,{children:S.map((function(n,s){return(0,y.jsxs)(x.T6,{children:[(0,y.jsx)(x.is,{scope:"row",children:s+1}),(0,y.jsx)(x.NN,{children:b()(n.checkInDate).format("LL")}),(0,y.jsx)(x.NN,{children:b()(n.checkOutDate).format("LL")}),(0,y.jsxs)(x.NN,{children:[n.guestName,", ",(0,y.jsx)("b",{children:"Tel:"})," ",n.guestPhone,(0,y.jsx)("br",{}),(0,y.jsx)("b",{children:"Email:"})," ",n.guestEmail]}),(0,y.jsxs)(x.NN,{children:[n.rooms[0].roomNumber," - ",n.rooms[0].type]}),(0,y.jsxs)(x.NN,{children:["$ ",n.totalPrice||n.rooms[0].price," "]}),(0,y.jsx)(x.NN,{children:(0,y.jsx)(x.u5,{color:"info",variant:"outline",className:"me-1",title:"Ver m\xe1s",onClick:function(){R(n),e("/bookings")},children:(0,y.jsx)(j.Z,{icon:d})})})]},(0,l.Z)())}))})]})})})})]}),(0,y.jsxs)(x.xH,{className:"mb-2 my-3",children:[(0,y.jsx)(x.bn,{children:(0,y.jsx)("h2",{children:(0,y.jsx)("strong",{children:"HOTELES"})})}),(0,y.jsx)(x.sl,{color:"info",children:(0,y.jsx)(x.rb,{children:(0,y.jsx)(x.b7,{xs:12,children:(0,y.jsxs)(x.Sx,{align:"middle",responsive:!0,children:[(0,y.jsx)(x.V,{children:(0,y.jsxs)(x.T6,{children:[(0,y.jsx)(x.is,{scope:"col",children:"#"}),(0,y.jsx)(x.is,{scope:"col",children:"Nombre"}),(0,y.jsx)(x.is,{scope:"col",children:"Imagen"}),(0,y.jsx)(x.is,{scope:"col",children:"Estrellas"}),(0,y.jsx)(x.is,{scope:"col",children:"Direcci\xf3n"}),(0,y.jsx)(x.is,{scope:"col",children:"Activo"})]})}),(0,y.jsx)(x.NR,{children:D.map((function(n,s){var r,a,c;return(0,y.jsxs)(x.T6,{children:[(0,y.jsx)(x.is,{scope:"row",children:s+1}),(0,y.jsx)(x.NN,{children:n.name}),(0,y.jsx)(x.NN,{children:(0,y.jsx)(x.cU,{size:"xl",src:n.image})}),(0,y.jsx)(x.NN,{children:(0,i.Z)(Array(n.stars||0)).map((function(e,n){return(0,y.jsx)(j.Z,{icon:u.m,size:"lg"},n)}))}),(0,y.jsx)(x.NN,{children:"".concat(null===n||void 0===n||null===(r=n.address)||void 0===r?void 0:r.country,", ").concat(null===n||void 0===n||null===(a=n.address)||void 0===a?void 0:a.city," - ").concat(null===n||void 0===n||null===(c=n.address)||void 0===c?void 0:c.street)}),(0,y.jsx)(x.NN,{children:(0,y.jsx)(x.kV,{disabled:!0,checked:n.active})}),(0,y.jsx)(x.NN,{children:(0,y.jsx)(x.u5,{color:"info",variant:"outline",className:"me-1",onClick:function(){k(n),e("/hotels")},children:(0,y.jsx)(j.Z,{icon:d})})})]},(0,l.Z)())}))})]})})})})]})]}):(0,y.jsxs)(x.xH,{className:"mb-2 my-3",children:[(0,y.jsx)(x.bn,{children:(0,y.jsx)("h2",{children:(0,y.jsx)("strong",{children:"RESERVAR"})})}),(0,y.jsxs)(x.sl,{color:"info",children:[(0,y.jsxs)(x.rb,{className:"align-items-center",children:[(0,y.jsxs)(x.b7,{xs:3,children:[(0,y.jsx)(x.L8,{children:"Fecha de entrada"}),(0,y.jsx)(v.AS,{name:"checkInDate",value:ne,onChange:Q})]}),(0,y.jsxs)(x.b7,{xs:3,children:[(0,y.jsx)(x.L8,{children:"Fecha de salida"}),(0,y.jsx)(v.AS,{name:"checkOutDate",value:se,onChange:Q})]}),(0,y.jsxs)(x.b7,{children:[(0,y.jsx)(x.L8,{children:"Filtrar"}),(0,y.jsxs)(x.LX,{name:"filter",value:re,onChange:Q,children:[(0,y.jsx)("option",{value:"type",children:"Tipo"}),(0,y.jsx)("option",{value:"description",children:"Descripci\xf3n"}),(0,y.jsx)("option",{value:"amenities",children:"Comodidades"}),(0,y.jsx)("option",{value:"price",children:"Precio"})]})]}),(0,y.jsx)(x.b7,{children:"price"!==re?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(x.L8,{children:"Buscar"}),(0,y.jsx)(x.jO,{type:"text",name:"search",value:ie,onChange:Q})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(x.L8,{children:["Rango: $ 0 - ",parseInt(ae).toLocaleString()]}),(0,y.jsx)("br",{}),(0,y.jsx)(x.ZB,{name:"range",min:0,step:2e4,max:1e6,defaultValue:ae,onChange:Q})]})}),(0,y.jsx)(x.b7,{xs:1,className:"align-self-center",children:(0,y.jsx)(x.u5,{align:"center",className:"mt-4",type:"submit",color:"success",onClick:ge,children:(0,y.jsx)(j.Z,{icon:h})})})]}),(0,y.jsx)(x.rb,{className:"mt-5",children:(0,y.jsx)(x.b7,{xs:12,children:(0,y.jsxs)(x.Sx,{align:"middle",responsive:!0,children:[(0,y.jsx)(x.V,{children:(0,y.jsxs)(x.T6,{children:[(0,y.jsx)(x.is,{scope:"col",children:"#"}),(0,y.jsx)(x.is,{scope:"col",children:"Tipo"}),(0,y.jsx)(x.is,{scope:"col",children:"Descripci\xf3n"}),(0,y.jsx)(x.is,{scope:"col",children:"Comodidades"}),(0,y.jsx)(x.is,{scope:"col",children:"Precio"})]})}),(0,y.jsx)(x.NR,{children:null===P||void 0===P?void 0:P.map((function(e,n){var s;return(0,y.jsxs)(x.T6,{children:[(0,y.jsx)(x.is,{scope:"row",children:n+1}),(0,y.jsx)(x.NN,{children:e.type}),(0,y.jsx)(x.NN,{children:e.description}),(0,y.jsx)(x.NN,{children:null===(s=e.amenities)||void 0===s?void 0:s.join(", ")}),(0,y.jsx)(x.NN,{children:e.price}),(0,y.jsx)(x.NN,{children:(0,y.jsx)(x.u5,{color:"info",variant:"outline",className:"me-1",onClick:function(){F(!0),X(e),he(p)},children:"Reservar"})})]},(0,l.Z)())}))})]})})})]})]}),(0,y.jsxs)(x.Tk,{size:"xl",visible:Y,onClose:function(){return F(!1)},children:[(0,y.jsx)(x.p0,{children:(0,y.jsx)(x.fl,{children:"Reservar"})}),(0,y.jsx)(x.sD,{children:(0,y.jsxs)(x.lx,{className:"row g-3",validated:B,onSubmit:function(e){var n=e.currentTarget;e.preventDefault(),!1===n.checkValidity()?e.stopPropagation():g().fire({title:"\xbfDesea guardar los cambios?",showDenyButton:!0,icon:"question",confirmButtonText:"Continuar",denyButtonText:"Cancelar"}).then((function(e){e.isConfirmed&&(N((0,r.Z)((0,r.Z)({},le),{},{_id:s.uid})),I({checkInDate:ne,checkOutDate:se,roomType:W.type,guestTypeDoc:ue,guestName:me+je,guestEmail:be,guestPhone:pe,totalPrice:Ne(),paid:!1,room:W._id,emergencyContactName:ve,emergencyContactPhone:fe,state:"",confirm:!1}),ge(),F(!1),de())}))},children:[(0,y.jsxs)(x.b7,{xs:3,children:[(0,y.jsx)(x.L8,{children:"Tipo de documento"}),(0,y.jsxs)(x.LX,{name:"typeDoc",value:ue,onChange:te,feedbackinvalid:"Requerido",required:!0,children:[(0,y.jsx)("option",{value:"C\xe9dula de ciudadan\xeda",children:"C\xe9dula de ciudadan\xeda"}),(0,y.jsx)("option",{value:"Pasaporte",children:"Pasaporte"}),(0,y.jsx)("option",{value:"DNI",children:"DNI"}),(0,y.jsx)("option",{value:"Tarjeta de residencia",children:"Tarjeta de residencia"}),(0,y.jsx)("option",{value:"NIE (N\xfamero de Identificaci\xf3n de Extranjero)",children:"NIE (N\xfamero de Identificaci\xf3n de Extranjero)"})]})]}),(0,y.jsxs)(x.b7,{xs:3,children:[(0,y.jsx)(x.L8,{children:"Identificaci\xf3n"}),(0,y.jsx)(x.jO,{type:"text",name:"ID",value:xe,onChange:te,feedbackinvalid:"Requerido",required:!0})]}),(0,y.jsxs)(x.b7,{xs:6,children:[(0,y.jsx)(x.L8,{children:"Nombres"}),(0,y.jsx)(x.jO,{type:"text",name:"firstName",value:me,onChange:te,feedbackinvalid:"Requerido",required:!0})]}),(0,y.jsxs)(x.b7,{xs:8,children:[(0,y.jsx)(x.L8,{children:"Apellidos"}),(0,y.jsx)(x.jO,{type:"text",name:"lastName",value:je,onChange:te,feedbackinvalid:"Requerido",required:!0})]}),(0,y.jsxs)(x.b7,{xs:4,children:[(0,y.jsx)(x.L8,{children:"Tel\xe9fono"}),(0,y.jsx)(x.jO,{type:"number",name:"phone",value:pe,onChange:te,feedbackinvalid:"Requerido",required:!0})]}),(0,y.jsxs)(x.b7,{xs:6,children:[(0,y.jsx)(x.L8,{children:"Email"}),(0,y.jsx)(x.jO,{type:"text",name:"email",value:be,onChange:te,feedbackinvalid:"Requerido",required:!0})]}),(0,y.jsx)(x.b7,{xs:6}),(0,y.jsxs)(x.b7,{xs:6,children:[(0,y.jsx)(x.L8,{children:"Nombre de contacto de emergencia"}),(0,y.jsx)(x.jO,{type:"text",name:"emergencyContactName",value:ve,onChange:te,feedbackinvalid:"Requerido",required:!0})]}),(0,y.jsxs)(x.b7,{xs:6,children:[(0,y.jsx)(x.L8,{children:"Tel\xe9fono de contacto de emergencia"}),(0,y.jsx)(x.jO,{type:"number",name:"emergencyContactPhone",value:fe,onChange:te,feedbackinvalid:"Requerido",required:!0})]}),(0,y.jsxs)(x.b7,{xs:2,children:[(0,y.jsx)(x.L8,{children:"Fecha de entrada"}),(0,y.jsx)("h5",{children:(0,y.jsx)("b",{children:ne&&ne.toLocaleDateString()})})]}),(0,y.jsxs)(x.b7,{xs:2,children:[(0,y.jsx)(x.L8,{children:"Fecha de salida"}),(0,y.jsx)("h5",{children:(0,y.jsx)("b",{children:se&&se.toLocaleDateString()})})]}),(0,y.jsxs)(x.b7,{xs:2,children:[(0,y.jsx)(x.L8,{children:"N\xb0 de noches"}),(0,y.jsx)("h5",{children:(0,y.jsx)("b",{children:ye()})})]}),(0,y.jsxs)(x.b7,{xs:2,children:[(0,y.jsx)(x.L8,{children:"Precio"}),(0,y.jsx)("h5",{children:(0,y.jsxs)("b",{children:["$ ",null===W||void 0===W?void 0:W.price]})})]}),(0,y.jsxs)(x.b7,{xs:2,children:[(0,y.jsx)(x.L8,{children:"Valor total"}),(0,y.jsx)("h5",{children:(0,y.jsxs)("b",{children:["$ ",Ne()]})})]}),(0,y.jsxs)(x.b7,{xs:12,children:[(0,y.jsx)(x.u5,{color:"danger",className:"float-end ms-2",onClick:function(){g().fire({title:"\xbfDesea regresar y descartar los cambios?",showDenyButton:!0,icon:"question",confirmButtonText:"Continuar",denyButtonText:"Cancelar"}).then((function(e){e.isConfirmed&&(ee(),z(!1),F(!1))}))},children:"Cancelar"}),(0,y.jsx)(x.u5,{color:"success",className:"float-end",type:"submit",children:"Guardar"})]})]})})]})]})})}},44430:function(e,n,s){"use strict";s.d(n,{m:function(){return i}});var i=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z' class='ci-primary'/>"]},45098:function(e,n,s){!function(e){"use strict";var n="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),s="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),i=[/^ene/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i],r=/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;e.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,i){return e?/-MMM-/.test(i)?s[e.month()]:n[e.month()]:n},monthsRegex:r,monthsShortRegex:r,monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,monthsParse:i,longMonthsParse:i,shortMonthsParse:i,weekdays:"domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",ss:"%d segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",w:"una semana",ww:"%d semanas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4},invalidDate:"Fecha inv\xe1lida"})}(s(72426))},42982:function(e,n,s){"use strict";s.d(n,{Z:function(){return a}});var i=s(30907);var r=s(40181);function a(e){return function(e){if(Array.isArray(e))return(0,i.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,r.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=479.b451dbbe.chunk.js.map