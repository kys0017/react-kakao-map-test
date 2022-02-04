(this["webpackJsonpreact-kakao-map-test"]=this["webpackJsonpreact-kakao-map-test"]||[]).push([[0],{142:function(e,n,t){},238:function(e,n,t){"use strict";t.r(n);var a=t(1),o=t.n(a),r=t(30),c=t.n(r),i=(t(100),t(142),t(27)),s=t(28),l=t(25),d=t(98),u="map/SET_MAP",p={map:null};var f,b,j,m=t(7),x=s.a.div(f||(f=Object(i.a)(["\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    z-index: 0;\n"]))),h=function(e){var n=e.children,t=Object(l.b)(),o=Object(a.useRef)();return Object(a.useEffect)((function(){console.log("map init!");var e={center:new kakao.maps.LatLng("37.50802","127.062835"),level:3},n=new kakao.maps.Map(o.current,e);t(function(e){return{type:u,map:e}}(n))}),[t]),Object(m.jsx)(x,{ref:o,children:n})},g=t(45),O=function(){return"geolocation"in navigator?new Promise((function(e,n){navigator.geolocation.getCurrentPosition(e,n)})):null},v=function(e,n,t){var a=new kakao.maps.LatLng(n,t);e.setCenter(a)},k=function(e,n){e.setLevel(n)},y=function(e,n){return e.getLevel()},w=s.a.div(b||(b=Object(i.a)(["\n    position: absolute;\n    bottom: 2rem;\n    right: 1rem;\n    width: 36px;\n    height: 72px;\n    overflow: hidden;\n    background-color: #f5f5f5;\n    z-index: 10;\n\n    border: 1px solid #919191;\n    border-radius: 5px;\n\n    span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 36px;\n        height: 36px;\n        cursor: pointer;\n\n        svg {\n            flex: 1;\n            font-size: 22px;\n        }\n\n        &:first-child {\n            border-bottom: 1px solid #bfbfbf;\n        }\n    }\n"]))),C=function(){var e=Object(l.c)((function(e){return{map:e.mapSetting.map}})).map;return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(w,{children:[Object(m.jsx)("span",{onClick:function(){return k(e,y(e)-1)},children:Object(m.jsx)(g.e,{})}),Object(m.jsx)("span",{onClick:function(){return k(e,y(e)+1)},children:Object(m.jsx)(g.d,{})})]})})},S=t(23),_=t(242),z=s.a.div(j||(j=Object(i.a)(["\n  display: flex;\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  width: 130px;\n  height: 30px;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  z-index: 10;\n\n  border: 1px solid #919191;\n  border-radius: 5px;\n\n  @media screen and (max-width: 768px) {\n    top: 10rem;\n  }\n\n  span {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 65px;\n    height: 30px;\n    cursor: pointer;\n\n    svg {\n      flex: 1;\n      font-size: 22px;\n    }\n  }\n\n  .btn {\n    background: #fff;\n    background: linear-gradient(#fff, #e6e6e6);\n\n    &:hover {\n      background: #f5f5f5;\n      background: linear-gradient(#f5f5f5, #e3e3e3);\n    }\n\n    &:active {\n      background: #e6e6e6;\n      background: linear-gradient(#e6e6e6, #fff);\n    }\n  }\n\n  .selected_btn {\n    background: #40a9ff;\n\n    //&:hover {\n    //    color: #fff;\n    //}\n  }\n"]))),L=function(){var e=Object(l.c)((function(e){return{map:e.mapSetting.map}})).map,n=Object(a.useState)("selected_btn"),t=Object(S.a)(n,2),o=t[0],r=t[1],c=Object(a.useState)("btn"),i=Object(S.a)(c,2),s=i[0],d=i[1],u=function(n){!function(e,n){"roadmap"===n?e.setMapTypeId(kakao.maps.MapTypeId.ROADMAP):e.setMapTypeId(kakao.maps.MapTypeId.HYBRID)}(e,n),"roadmap"===n?(r("selected_btn"),d("btn")):(r("btn"),d("selected_btn"))};return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(z,{children:[Object(m.jsx)("span",{className:o,onClick:function(){return u("roadmap")},children:Object(m.jsx)(_.a,{})}),Object(m.jsx)("span",{className:s,onClick:function(){return u("skyview")},children:Object(m.jsx)(_.b,{})})]})})},M=t(66),A=t(247),I=t(248),T=t(243),R=[],B=(new kakao.maps.InfoWindow({zIndex:1,removable:!0}),new kakao.maps.CustomOverlay({zIndex:3,yAnchor:1})),P=function(e,n){var t=new kakao.maps.Marker({map:e,position:new kakao.maps.LatLng(n.y,n.x),clickable:!0});R.push(t),J(t,"click",(function(){B.setMap(e),B.setContent(K(n)),B.setPosition(t.getPosition()),document.querySelector(".ant-popover-title").appendChild(q())}))},E=function(e){for(var n=0;n<R.length;n++)R[n].setMap(e)},F=null,D=function(e,n){F?F.setPosition(new kakao.maps.LatLng(n.y,n.x)):F=H(e,n),J(F,"click",(function(){B.setMap(e),B.setContent(K(n)),B.setPosition(F.getPosition()),document.querySelector(".ant-popover-title").appendChild(q())}))},q=function(){var e=document.createElement("span");return e.className="close",e.style.position="absolute",e.style.top="8px",e.style.right="8px",e.style.background="#000",e.style.color="#fff",e.style.textAlign="center",e.style.width="15px",e.style.fontSize="x-small",e.style.cursor="default",e.textContent="X",e.onclick=G,e.title="\ub2eb\uae30",e};function K(e){return'\n      <div class="ant-popover ant-popover-placement-top" style="position: relative; top: -35px; max-width: 270px;" >\n        <div class="ant-popover-content">\n          <div class="ant-popover-arrow">\n            <span class="ant-popover-arrow-content"></span>\n          </div>\n          <div class="ant-popover-inner" role="tooltip">\n            <div class="ant-popover-title">\n              <span style="display: inline-block;width: 94%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="'.concat(e.place_name,'">\n                ').concat(e.place_name,'\n              </span> \n            </div>\n            <div class="ant-popover-inner-content" style="font-size: x-small">\n              <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">\n                <span title="').concat(e.address_name,'">').concat(e.address_name,'</span> <br />\n                <span title="').concat(e.road_address_name,'">').concat(e.road_address_name,"</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ")}var N,G=function(){return B.setMap(null)},H=function(e,n){return new kakao.maps.Marker({map:e,position:new kakao.maps.LatLng(n.y,n.x)})},J=function(e,n,t){e&&kakao.maps.event.addListener(e,n,t)},W=function(e,n,t){e&&kakao.maps.event.removeListener(e,n,t)},U=o.a.memo(s.a.div(N||(N=Object(i.a)(["\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  height: auto;\n  overflow: hidden;\n  margin-top: 3px;\n  border-radius: 5px;\n\n  & .ant-card-extra {\n    padding: 0;\n  }\n"])))),X={width:"1.2rem",height:"1.2rem"},Y=function(e){var n=e.type,t=e.data,a=e.bookmarks,o=e.onClickBookmark,r=e.onClickClose,c=Object(l.c)((function(e){return{map:e.mapSetting.map}})).map;return Object(m.jsxs)(U,{children:[Object(m.jsx)(A.a,{type:"inner",size:"small",title:"result"===n?"\uac80\uc0c9\uacb0\uacfc":"\ubd81\ub9c8\ud06c",headStyle:{height:"38px"},bodyStyle:{display:"none"},extra:Object(m.jsx)(g.a,{style:{fontSize:"1.5rem"},onClick:r})}),Object(m.jsx)(A.a,{size:"small",style:{flex:1,height:"100%",overflow:"auto"},children:Object(m.jsx)(I.b,{itemLayout:"horizontal",dataSource:"result"===n?t:a,locale:{emptyText:Object(m.jsx)("div",{children:"No data"})},renderItem:function(e){return Object(m.jsxs)(I.b.Item,{children:[Object(m.jsx)(I.b.Item.Meta,{title:e.data.place_name,description:e.data.road_address_name,onClick:function(){return function(e){v(c,e.y,e.x),D(c,e)}(e.data)},style:{cursor:"pointer"}}),"true"===e.isbookmark?Object(m.jsx)(T.b,{onClick:function(n){return o(n,e)},style:X}):Object(m.jsx)(T.a,{onClick:function(n){return o(n,e)},style:X})]})}})})]})},Q=o.a.memo(Y),V=t(131),Z=t.n(V).a.create({baseURL:"https://dapi.kakao.com",headers:{Authorization:"KakaoAK 6797801199c3b3d73ff33c7ca3edea88"}}),$=function(e){return Z.get("/v2/local/search/keyword.json?query=".concat(e))},ee=t(250);var ne=function(e){var n=e.onClickRadioButton,t=e.type,o=Object(a.useState)(!1),r=Object(S.a)(o,2),c=r[0],i=r[1],s=Object(a.useState)(""),l=Object(S.a)(s,2),d=l[0],u=l[1];return Object(a.useEffect)((function(){i("result"===t),u(t)}),[t]),Object(m.jsxs)(ee.a.Group,{size:"large",value:d,onChange:n,style:{display:"flex"},id:"radioGroup",children:[Object(m.jsxs)(ee.a.Button,{value:"result",style:{width:"100%",textAlign:"center",borderRadius:"0 0 0 5px"},id:"radioButtonResult",checked:c,children:[Object(m.jsx)(T.c,{style:{width:"1.2rem",height:"1.2rem",verticalAlign:"middle"}})," ","\uac80\uc0c9\uacb0\uacfc"]}),Object(m.jsxs)(ee.a.Button,{value:"bookmark",style:{width:"100%",textAlign:"center",borderRadius:"0 0 5px 0"},id:"radioButtonBookmark",checked:!c,children:[Object(m.jsx)(T.a,{style:{width:"1.2rem",height:"1.2rem",verticalAlign:"middle"}})," ","\ubd81\ub9c8\ud06c"]})]})},te=t(244),ae=t(249),oe=function(){return Object(m.jsx)(g.c,{style:{width:"1.2rem",height:"1.2rem",animationName:"rotate",animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}})};var re,ce,ie,se=function(e){var n=e.query,t=e.options,o=e.onChange,r=e.onSelect,c=e.onKeyDown,i=e.onReset,s=Object(a.useState)(Object(m.jsx)(g.f,{})),l=Object(S.a)(s,2),d=l[0],u=l[1],p=function(){i(),u(Object(m.jsx)(g.f,{}))};return Object(a.useMemo)((function(){u(t.length>0?Object(m.jsx)(g.b,{onClick:p}):Object(m.jsx)(g.f,{}))}),[t]),Object(m.jsx)(A.a,{size:"small",title:"REACT-KAKAO-MAP-TEST",bordered:!1,headStyle:{backgroundColor:"rgb(64 169 255)",color:"#fff",borderRadius:"5px 5px 0 0"},children:Object(m.jsx)(te.a,{value:n,options:t,onChange:function(e){u(Object(m.jsx)(oe,{})),o(e)},onSelect:function(e,n){r(e,n),u(Object(m.jsx)(g.b,{onClick:p}))},style:{width:"100%"},children:Object(m.jsx)(ae.a,{suffix:d,size:"large",onKeyDown:c})})})},le=t(59),de=t(38),ue=o.a.memo(s.a.div(re||(re=Object(i.a)(["\n  svg {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  @keyframes rotate {\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n"])))),pe=function(e,n){return n.map((function(n){return{query:e,key:"".concat(n.id),value:"".concat(n.id),text:"".concat(n.place_name),data:n,isbookmark:"false",label:Object(m.jsx)("div",{children:Object(m.jsxs)("span",{children:[n.place_name," ",Object(m.jsx)("br",{}),Object(m.jsx)("span",{style:{fontSize:"0.5rem"},children:n.road_address_name})]})})}}))},fe=function(){var e=Object(l.c)((function(e){return{map:e.mapSetting.map}})).map,n=Object(a.useState)([]),t=Object(S.a)(n,2),o=t[0],r=t[1],c=Object(a.useState)([]),i=Object(S.a)(c,2),s=i[0],d=i[1],u=Object(a.useState)(""),p=Object(S.a)(u,2),f=p[0],b=p[1],j=Object(a.useState)(!1),x=Object(S.a)(j,2),h=x[0],g=x[1],O=Object(a.useState)("result"),k=Object(S.a)(O,2),y=k[0],w=k[1],C=Object(a.useState)([]),_=Object(S.a)(C,2),z=_[0],L=_[1];Object(a.useEffect)((function(){var e=setTimeout((function(){A(f)}),300);return function(){return clearTimeout(e)}}),[f]);var A=function(e){e?$(e).then((function(n){var t=n.data.documents,a=t.length>0;r(a?pe(e,t):[])})).catch((function(e){throw new Error("\ud0a4\uc6cc\ub4dc \uac80\uc0c9 \uc5d0\ub7ec!")})):I()},I=function(){b(""),r([])};return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(le.a,{style:{flex:"0 1 0%",height:"100%",padding:"10px"},children:Object(m.jsxs)(de.a,{xs:24,md:12,lg:8,xl:6,style:{flex:1,height:"100%",display:"flex",flexDirection:"column"},children:[Object(m.jsxs)(ue,{children:[Object(m.jsx)(se,{query:f,options:o,onChange:function(e){return b(e)},onKeyDown:function(e){var n,t;13===e.keyCode&&(g(!0),w("result"),(null===(n=o[0])||void 0===n?void 0:n.query)||(null===(t=o[0])||void 0===t?void 0:t.query)!==f?$(f).then((function(e){var n=e.data.documents;return d(pe(f,n))})):d(o))},onSelect:function(n,t){var a=t.text,r=t.data;b(a),g(!0),f===a?d(o):$(a).then((function(e){var n=e.data.documents;return d(pe(a,n))})),v(e,r.y,r.x),D(e,r)},onReset:I}),Object(m.jsx)(ne,{type:y,onClickRadioButton:function(e){w(e.target.value),g(!0)}})]}),h&&Object(m.jsx)(Q,{type:y,data:s,bookmarks:z,onClickClose:function(){return g(!1)},onClickBookmark:function(e,n){var t=z.findIndex((function(e){return e.value===n.value}));-1===t?(n.isbookmark="true",L([].concat(Object(M.a)(z),[n]))):(n.isbookmark="false",z.splice(t,1),L(Object(M.a)(z)))}})]})})})},be=o.a.memo(fe),je=t(96),me=t.n(je),xe=t(132),he=t(245),ge=s.a.div(ce||(ce=Object(i.a)(["\n    position: absolute;\n    bottom: 7rem;\n    right: 1rem;\n    width: 36px;\n    height: 36px;\n    overflow: hidden;\n    background-color: #f5f5f5;\n    z-index: 10;\n\n    border: 1px solid #919191;\n    border-radius: 5px;\n\n    span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 36px;\n        height: 36px;\n        cursor: pointer;\n\n        svg {\n            flex: 1;\n            font-size: 22px;\n        }\n\n        &:first-child {\n            border-bottom: 1px solid #bfbfbf;\n        }\n    }\n"]))),Oe=function(){var e=Object(l.c)((function(e){return{map:e.mapSetting.map}})).map,n=function(){var n=Object(xe.a)(me.a.mark((function n(){var t,a;return me.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,O({enableHighAccuracy:!0});case 3:t=n.sent,a=t.coords,v(e,a.latitude,a.longitude),k(e,3),n.next=12;break;case 9:throw n.prev=9,n.t0=n.catch(0),new Error("set position error!");case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(){return n.apply(this,arguments)}}();return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(ge,{children:Object(m.jsx)("span",{onClick:n,children:Object(m.jsx)(he.a,{})})})})},ve=t(246),ke=s.a.div(ie||(ie=Object(i.a)(["\n    position: absolute;\n    top: 7rem;\n    right: 1rem;\n    width: 36px;\n    height: 36px;\n    overflow: hidden;\n    background-color: #f5f5f5;\n    z-index: 10;\n\n    border: 1px solid #919191;\n    border-radius: 5px;\n\n    @media screen and (max-width: 768px) {\n        top: 16rem;\n    }\n\n    span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 36px;\n        height: 36px;\n        cursor: pointer;\n\n        svg {\n            flex: 1;\n            font-size: 22px;\n        }\n\n        &:first-child {\n            border-bottom: 1px solid #bfbfbf;\n        }\n    }\n\n    .btn {\n        background: #fff;\n        background: linear-gradient(#fff, #e6e6e6);\n\n        &:hover {\n            background: #f5f5f5;\n            background: linear-gradient(#f5f5f5, #e3e3e3);\n        }\n\n        &:active {\n            background: #e6e6e6;\n            background: linear-gradient(#e6e6e6, #fff);\n        }\n    }\n\n    .selected_btn {\n        background: #b197fc;\n\n        //&:hover {\n        //    color: #fff;\n        //}\n    }\n"]))),ye=function(){var e=Object(l.c)((function(e){return{map:e.mapSetting.map}})).map,n=Object(a.useState)(!1),t=Object(S.a)(n,2),o=t[0],r=t[1],c=Object(a.useState)("btn"),i=Object(S.a)(c,2),s=i[0],d=i[1],u=function(){!function(e,n){E(null),R=[];var t=[];new kakao.maps.services.Places(e).categorySearch(n,(function(n,a,o){if(a===kakao.maps.services.Status.OK){t=Object(M.a)(n);for(var r=0;r<t.length;r++)P(e,t[r])}}),{useMapBounds:!0,size:15,page:1})}(e,"CE7")};return Object(a.useEffect)((function(){if(e)return o?(d("selected_btn"),u(),J(e,"dragend",u),J(e,"zoom_changed",u),J(e,"center_changed",u)):d("btn"),function(){E(null),W(e,"dragend",u),W(e,"zoom_changed",u),W(e,"center_changed",u)}}),[o]),Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(ke,{children:Object(m.jsx)("span",{className:s,onClick:function(){r(!o)},children:Object(m.jsx)(ve.a,{})})})})};var we=function(){return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(h,{children:[Object(m.jsx)(ye,{}),Object(m.jsx)(Oe,{}),Object(m.jsx)(L,{}),Object(m.jsx)(C,{})]}),Object(m.jsx)(be,{})]})},Ce=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,251)).then((function(n){var t=n.getCLS,a=n.getFID,o=n.getFCP,r=n.getLCP,c=n.getTTFB;t(e),a(e),o(e),r(e),c(e)}))},Se=t(63),_e=Object(Se.combineReducers)({mapSetting:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,n=arguments.length>1?arguments[1]:void 0;return n.type===u?Object(d.a)(Object(d.a)({},e),{},{map:n.map}):e}}),ze=_e,Le=t(133),Me=Object(Se.createStore)(ze,Object(Le.composeWithDevTools)());c.a.render(Object(m.jsx)(l.a,{store:Me,children:Object(m.jsx)(we,{})}),document.getElementById("root")),Ce()}},[[238,1,2]]]);
//# sourceMappingURL=main.d17c9ba7.chunk.js.map