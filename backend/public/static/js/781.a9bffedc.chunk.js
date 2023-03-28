"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[781],{10781:function(e,n,s){s.r(n),s.d(n,{default:function(){return p}});var c=s(1413),i=s(70885),r=["512 512","<polygon fill='var(--ci-primary-color, currentColor)' points='200.359 382.269 61.057 251.673 82.943 228.327 199.641 337.731 428.686 108.687 451.314 131.313 200.359 382.269' class='ci-primary'/>"],t=["512 512","<polygon fill='var(--ci-primary-color, currentColor)' points='348.071 141.302 260.308 229.065 172.545 141.302 149.917 163.929 237.681 251.692 149.917 339.456 172.545 362.083 260.308 274.32 348.071 362.083 370.699 339.456 282.935 251.692 370.699 163.929 348.071 141.302' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M425.706,86.294A240,240,0,0,0,86.294,425.706,240,240,0,0,0,425.706,86.294ZM256,464C141.309,464,48,370.691,48,256S141.309,48,256,48s208,93.309,208,208S370.691,464,256,464Z' class='ci-primary'/>"],a=s(511),l=s(24846),o=s(78983),d=s(72426),h=s.n(d),x=s(72791),j=s(12254),u=s(48736),m=s(33943),f=s(21830),b=s.n(f),g=s(92810),C=s(80184),p=function(){var e,n,s,d,f,p,v=(0,u.uz)(),N=v.reservations,y=void 0===N?[]:N,k=v.activeReservations,D=v.startLoadingReservations,Z=v.setActiveReservation,L=v.startSavingReservation,S=(0,u.A)(),O=S.rooms,T=S.startFindRooms,P=(0,x.useState)(!1),I=(0,i.Z)(P,2),B=I[0],E=I[1],w=(0,x.useState)(!1),A=(0,i.Z)(w,2),R=A[0],F=A[1],M=(0,m.c)({_id:void 0,checkInDate:null,checkOutDate:null,roomType:"",guestName:"",guestEmail:"",guestPhone:"",emergencyContactName:"",emergencyContactPhone:"",totalPrice:0,paid:!1,state:null}),H=(0,i.Z)(M,4),V=H[0],_=H[1],q=H[2],z=H[3],K=V.checkInDate,U=V.checkOutDate,$=V.guestName,G=V.guestEmail,J=V.guestPhone,Q=V.emergencyContactName,W=V.emergencyContactPhone,X=V.state,Y=V.paid,ee=V.totalPrice,ne=function(e){E(!0),F(!1),z((0,c.Z)((0,c.Z)({},e),{},{checkInDate:new Date(e.checkInDate),checkOutDate:new Date(e.checkOutDate)})),T({_id:e.room})},se=function(e){b().fire({title:"\xbfDesea ".concat("Cancelada"===e.state?"cancelar":"confirmar"," esta reserva?"),showDenyButton:!0,icon:"question",confirmButtonText:"Continuar",denyButtonText:"Cancelar"}).then((function(n){if(n.isConfirmed){var s=B?K.toISOString():e.checkInDate,i=B?U.toISOString():e.checkOutDate,r=(0,c.Z)((0,c.Z)({},e),{},{checkInDate:s,checkOutDate:i,totalPrice:ie(),paid:!0,confirm:!0});L(r),ne(r),D()}}))},ce=function(){if(!U||!K)return-1;var e=U.getTime()-K.getTime();return Math.ceil(e/864e5)},ie=function(){var e,n=ce();return n<=0?ee:n*(O.length?null===(e=O[0])||void 0===e?void 0:e.price:0)};return(0,x.useEffect)((function(){D()}),[]),(0,x.useEffect)((function(){k&&Object.keys(k).length&&(ne(k),Z({}))}),[k]),(0,C.jsx)(o.xH,{className:"mb-4",children:(0,C.jsxs)(o.sl,{children:[(0,C.jsx)(o.rb,{children:(0,C.jsx)(o.b7,{sm:5,children:(0,C.jsx)("h4",{className:"card-title mb-3",children:"RESERVAS"})})}),(0,C.jsx)(o.KB,{fluid:!0,children:(0,C.jsx)(o.xH,{className:"mb-4",children:(0,C.jsx)(o.sl,{children:B?(0,C.jsxs)(o.lx,{className:"row g-3",validated:R,onSubmit:function(e){var n=e.currentTarget;e.preventDefault(),!1===n.checkValidity()?e.stopPropagation():b().fire({title:"\xbfDesea guardar los cambios?",showDenyButton:!0,icon:"question",confirmButtonText:"Continuar",denyButtonText:"Cancelar"}).then((function(e){e.isConfirmed&&(L((0,c.Z)((0,c.Z)({},V),{},{checkInDate:K.toISOString(),checkOutDate:U.toISOString(),totalPrice:ie()})),q(),E(!1),F(!1))})),F(!0)},children:[(0,C.jsx)(o.b7,{xs:6,children:(0,C.jsxs)(o.rb,{children:[(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Fecha de entrada"}),(0,C.jsx)(j.AS,{name:"checkInDate",value:K,onChange:_,disabled:!!X})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Fecha de salida"}),(0,C.jsx)(j.AS,{name:"checkOutDate",value:U,onChange:_,disabled:!!X})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Cliente"}),(0,C.jsx)(o.jO,{type:"text",name:"guestName",value:$,onChange:_,disabled:!!X})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Tel\xe9fono"}),(0,C.jsx)(o.jO,{type:"text",name:"guestPhone",value:J,onChange:_,disabled:!!X})]}),(0,C.jsxs)(o.b7,{xs:12,children:[(0,C.jsx)(o.L8,{children:"Correo"}),(0,C.jsx)(o.jO,{type:"text",name:"guestEmail",value:G,onChange:_,disabled:!!X})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Nombre de contacto de emergencia"}),(0,C.jsx)(o.jO,{type:"text",name:"emergencyContactName",value:Q,onChange:_,disabled:!!X})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Tel\xe9fono de contacto de emergencia"}),(0,C.jsx)(o.jO,{type:"text",name:"emergencyContactPhone",value:W,onChange:_,disabled:!!X})]})]})}),(0,C.jsx)(o.b7,{xs:6,children:(0,C.jsxs)(o.rb,{children:[(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Habitaci\xf3n"}),(0,C.jsx)("br",{}),(0,C.jsx)("h4",{children:(0,C.jsx)("b",{children:null===(e=O[0])||void 0===e?void 0:e.roomNumber})})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Tipo de habitaci\xf3n"}),(0,C.jsx)("br",{}),(0,C.jsx)("h4",{children:(0,C.jsx)("b",{children:null===(n=O[0])||void 0===n?void 0:n.type})})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Descripci\xf3n"}),(0,C.jsx)("br",{}),(0,C.jsx)("p",{children:(0,C.jsx)("b",{children:null===(s=O[0])||void 0===s?void 0:s.description})})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Comodidades"}),(0,C.jsx)("br",{}),(0,C.jsx)("h5",{children:(0,C.jsx)("b",{children:null===(d=O[0])||void 0===d||null===(f=d.amenities)||void 0===f?void 0:f.join(", ")})})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Pagada"}),(0,C.jsx)("h5",{children:(0,C.jsx)("b",{children:Y?"Si":"No"})})]}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"N\xb0 de noches"}),(0,C.jsx)("h5",{children:(0,C.jsx)("b",{children:ce()})})]}),(0,C.jsx)(o.b7,{xs:6,children:!!X&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o.L8,{children:"Estado"}),(0,C.jsx)("h6",{className:"text-".concat("Confirmada"===X?"success":"danger"),children:(0,C.jsx)("b",{children:"".concat(X).toLocaleUpperCase()})})]})}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Precio"}),(0,C.jsx)("h5",{children:(0,C.jsxs)("b",{children:["$ ",null===(p=O[0])||void 0===p?void 0:p.price]})})]}),(0,C.jsx)(o.b7,{xs:6}),(0,C.jsxs)(o.b7,{xs:6,children:[(0,C.jsx)(o.L8,{children:"Valor total"}),(0,C.jsx)("h5",{children:(0,C.jsxs)("b",{children:["$ ",ie()]})})]})]})}),(0,C.jsxs)(o.b7,{xs:12,children:[!X&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(o.u5,{color:"danger",variant:"outline",className:"float-end  ms-2",title:"Cancelar",onClick:function(){se((0,c.Z)((0,c.Z)({},V),{},{state:"Cancelada"}))},children:[(0,C.jsx)(l.Z,{icon:t})," ","Cancelar reserva"]}),(0,C.jsxs)(o.u5,{color:"success",variant:"outline",className:"float-end me-1",title:"Confirmar",onClick:function(){se((0,c.Z)((0,c.Z)({},V),{},{state:"Confirmada"}))},children:[(0,C.jsx)(l.Z,{icon:r})," ","Confirmar reserva"]}),(0,C.jsx)(o.u5,{color:"info",className:"float-start ms-2",type:"submit",children:"Actualizar datos"})]}),(0,C.jsx)(o.u5,{color:"danger",className:"float-start ms-2",onClick:function(){b().fire({title:"\xbfDesea regresar y descartar los cambios?",showDenyButton:!0,icon:"question",confirmButtonText:"Continuar",denyButtonText:"Cancelar"}).then((function(e){e.isConfirmed&&(q(),E(!1),F(!1))}))},children:"Regresar"})]})]}):(0,C.jsx)(o.KB,{fluid:!0,children:(0,C.jsx)(o.rb,{children:(0,C.jsx)(o.b7,{xs:12,children:(0,C.jsxs)(o.Sx,{align:"middle",responsive:!0,children:[(0,C.jsx)(o.V,{children:(0,C.jsxs)(o.T6,{children:[(0,C.jsx)(o.is,{scope:"col",children:"#"}),(0,C.jsx)(o.is,{scope:"col",children:"Fecha de entrada"}),(0,C.jsx)(o.is,{scope:"col",children:"Fecha de salida"}),(0,C.jsx)(o.is,{scope:"col",children:"Cliente"}),(0,C.jsx)(o.is,{scope:"col",children:"Contacto"}),(0,C.jsx)(o.is,{scope:"col",children:"Habitaci\xf3n/Tipo"}),(0,C.jsx)(o.is,{scope:"col",children:"Estado"})]})}),(0,C.jsx)(o.NR,{children:y.map((function(e,n){return(0,C.jsxs)(o.T6,{children:[(0,C.jsx)(o.is,{scope:"row",children:n+1}),(0,C.jsx)(o.NN,{children:h()(e.checkInDate).format("LL")}),(0,C.jsx)(o.NN,{children:h()(e.checkOutDate).format("LL")}),(0,C.jsxs)(o.NN,{children:[e.guestName,", ",(0,C.jsx)("b",{children:"Tel:"})," ",e.guestPhone,(0,C.jsx)("br",{}),(0,C.jsx)("b",{children:"Email:"})," ",e.guestEmail]}),(0,C.jsxs)(o.NN,{children:[e.guestName,", ",(0,C.jsx)("b",{children:"Tel:"})," ",e.guestPhone]}),(0,C.jsxs)(o.NN,{children:[e.rooms[0].roomNumber," - ",e.rooms[0].type]}),(0,C.jsx)(o.NN,{children:!!e.state&&(0,C.jsx)("h6",{className:"text-".concat("Confirmada"===e.state?"success":"danger"),children:(0,C.jsx)("b",{children:"".concat(e.state).toLocaleUpperCase()})})}),(0,C.jsxs)(o.NN,{children:[(0,C.jsx)(o.u5,{color:"info",variant:"outline",className:"me-1",onClick:function(){return ne(e)},children:(0,C.jsx)(l.Z,{icon:a.l})}),!e.state&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o.u5,{color:"success",variant:"outline",className:"me-1",title:"Confirmar",onClick:function(){se((0,c.Z)((0,c.Z)({},e),{},{state:"Confirmada"}))},children:(0,C.jsx)(l.Z,{icon:r})}),(0,C.jsx)(o.u5,{color:"danger",variant:"outline",title:"Cancelar",onClick:function(){se((0,c.Z)((0,c.Z)({},e),{},{state:"Cancelada"}))},children:(0,C.jsx)(l.Z,{icon:t})})]})]})]},(0,g.Z)())}))})]})})})})})})})]})})}},511:function(e,n,s){s.d(n,{l:function(){return c}});var c=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M29.663,482.25l.087.087a24.847,24.847,0,0,0,17.612,7.342,25.178,25.178,0,0,0,8.1-1.345l142.006-48.172,272.5-272.5A88.832,88.832,0,0,0,344.334,42.039l-272.5,272.5L23.666,456.541A24.844,24.844,0,0,0,29.663,482.25Zm337.3-417.584a56.832,56.832,0,0,1,80.371,80.373L411.5,180.873,331.127,100.5ZM99.744,331.884,308.5,123.127,388.873,203.5,180.116,412.256,58.482,453.518Z' class='ci-primary'/>"]}}]);
//# sourceMappingURL=781.a9bffedc.chunk.js.map