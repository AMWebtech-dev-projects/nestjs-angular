"use strict";(self.webpackChunkangular_node_training=self.webpackChunkangular_node_training||[]).push([[518],{2518:(f,a,c)=>{c.r(a),c.d(a,{SocketEventModule:()=>k});var u=c(6895),d=c(8438),e=c(4650),r=c(9745),l=c(9751),v=c(5085);let m=(()=>{class t{constructor(n){this.socket=n}close(){this.socket.disconnect()}sendMessage(n,s){this.socket.emit(n,s)}msgReceived(n){return new l.y(s=>{this.socket.on(n,i=>{s.next(i)})})}}return t.\u0275fac=function(n){return new(n||t)(e.LFG(v.s))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var p=c(7185);function h(t,o){if(1&t&&(e.TgZ(0,"tr",8)(1,"th",9),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA()()),2&t){const n=o.$implicit,s=o.index;e.xp6(2),e.Oqu(s+1),e.xp6(2),e.Oqu(n.firstName+" "+n.lastName),e.xp6(2),e.Oqu(n.email),e.xp6(2),e.Oqu("admin"==n.role?"Admin":"User")}}const g=[{path:"",component:(()=>{class t{constructor(n,s,i,Z){this.jwtService=n,this._WebSocketService=s,this.usersService=i,this.toastr=Z,this.usersList=[]}ngOnInit(){this.pingForGettingEvent()}sendDemoEvent(){this._WebSocketService.sendMessage("SocketJoinEvent",{_id:"6464b7d553a04ed0adfb2a48",firstName:(new Date).getTime()+" send by ui",lastName:"sen",email:"bharat@amwebtech.com",phoneNumber:9827848695,gender:"male",dob:"17/05/2023",role:"admin",status:1,skills:[],techStack:[],createdAt:"2023-05-17T11:17:41.187Z",updatedAt:"2023-05-17T11:17:41.187Z",__v:0,authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjRiN2Q1NTNhMDRlZDBhZGZiMmE0OCIsImlhdCI6MTY4NDc0ODMxNCwiZXhwIjoxNjg0NzU1NTE0fQ.UkikV6HN62VZsUS3RKsWBizCsX1CbY5uTIdWLRxKDec"})}pingForGettingEvent(){this._WebSocketService.msgReceived("SocketDemoEvent").subscribe(n=>this.appendEventMsg(n))}appendEventMsg(n){this.usersList.push(n)}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(r.Tj),e.Y36(m),e.Y36(r.fz),e.Y36(p._W))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-socket-event"]],decls:21,vars:1,consts:[[1,"d-flex","flex-row"],[1,"col-12"],["type","button",1,"btn","btn-danger","pull-right","text-white",3,"click"],[1,"container-fluid","app-user","bg-white","p-3"],[1,"table","table-bordered","table-hover","table-striped"],[1,"text-nowrap"],[1,"text-wrap"],["class"," border",4,"ngFor","ngForOf"],[1,"border"],["scope","row"]],template:function(n,s){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h4"),e._uU(3,"Here getting data from socket event. "),e.TgZ(4,"button",2),e.NdJ("click",function(){return s.sendDemoEvent()}),e._uU(5," Send Event"),e.qZA()(),e._UZ(6,"hr"),e.qZA()(),e.TgZ(7,"div",3)(8,"table",4)(9,"thead")(10,"tr",5)(11,"th"),e._uU(12,"S.No"),e.qZA(),e.TgZ(13,"th"),e._uU(14,"Username"),e.qZA(),e.TgZ(15,"th"),e._uU(16,"Email I'd"),e.qZA(),e.TgZ(17,"th"),e._uU(18,"Account Type"),e.qZA()()(),e.TgZ(19,"tbody",6),e.YNc(20,h,9,4,"tr",7),e.qZA()()()),2&n&&(e.xp6(20),e.Q6J("ngForOf",s.usersList))},dependencies:[u.sg]}),t})(),pathMatch:"full"}];let S=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[d.Bz.forChild(g),d.Bz]}),t})(),k=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.ez,S,r.eY]}),t})()}}]);