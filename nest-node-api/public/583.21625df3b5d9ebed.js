"use strict";(self.webpackChunkangular_node_training=self.webpackChunkangular_node_training||[]).push([[583],{583:(F,c,r)=>{r.r(c),r.d(c,{ForgotPasswordModule:()=>M});var a=r(9745),i=r(8438),o=r(4650),f=r(6405),p=r(7185),u=r(6895),g=r(433);function h(s,n){if(1&s&&(o.TgZ(0,"h6",23),o._uU(1),o.qZA()),2&s){const e=o.oxw();o.xp6(1),o.Oqu(e.errorMessage)}}function m(s,n){if(1&s&&(o.TgZ(0,"h6",24),o._uU(1),o.qZA()),2&s){const e=o.oxw();o.xp6(1),o.Oqu(e.successMessage)}}function w(s,n){1&s&&o._UZ(0,"i",25)}const P=function(){return["/login"]},v=[{path:"",component:(()=>{class s{constructor(e,t,d,l){this.globalService=e,this.spinner=t,this.usersService=d,this.toastr=l,this.title="Forgot Password | angular node training",this.successMessage="",this.errorMessage="",this.loading=!1,this.forgotPasswordInfo={email:"bharat@amwebtech.com"}}ngOnInit(){this.globalService.getPageTitle(this.title)}forgotPassword(){this.successMessage="",this.errorMessage="",this.loading=!0,this.usersService.forgotPassword(this.forgotPasswordInfo).subscribe({next:e=>{console.log("data",e),200===e.status?(this.toastr.success(e.message,"Success"),this.successMessage=e.message,this.spinner.hide(),this.loading=!1):(this.toastr.error(e.message,"Error"),this.errorMessage=e.message,this.spinner.hide(),this.loading=!1),this.forgotPasswordInfo.email=""},error:e=>{this.toastr.error("There are some server Please check connection.","Error"),this.forgotPasswordInfo.email="",this.spinner.hide()}})}}return s.\u0275fac=function(e){return new(e||s)(o.Y36(a.Uh),o.Y36(f.t2),o.Y36(a.fz),o.Y36(p._W))},s.\u0275cmp=o.Xpm({type:s,selectors:[["app-forgot-password"]],decls:33,vars:10,consts:[[1,"app-body"],[1,"main","d-flex","align-items-center"],[1,"container"],[1,"row"],[1,"col-lg-6","mx-auto","p-1"],[1,"card","p-3","position-relative"],[1,"d-flex","custom-border"],[1,"secondary-bg"],[1,"primary-bg"],[1,"card-body"],["id","forgotTitle"],[1,""],[1,"input-group","mb-3"],[1,"input-group-text"],[1,"far","fa-envelope"],["type","email","placeholder","Email address","id","forgotEmail","name","forgotPassword",1,"form-control",3,"ngModel","ngModelChange"],["class","text-danger",4,"ngIf"],["class","text-success",4,"ngIf"],[1,"col-12"],["type","button",1,"btn","btn-primary","px-4",3,"disabled","click"],["class","fa fa-refresh fa-spin ml-2","aria-hidden","true",4,"ngIf"],["type","button",1,"btn","btn-secondary","px-4","m-2",3,"routerLink"],[3,"innerHtml"],[1,"text-danger"],[1,"text-success"],["aria-hidden","true",1,"fa","fa-refresh","fa-spin","ml-2"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6),o._UZ(7,"span",7)(8,"span",8)(9,"span",7)(10,"span",8),o.qZA(),o.TgZ(11,"div",9)(12,"h1",10),o._uU(13,"Forgot Password"),o.qZA(),o.TgZ(14,"p",11),o._uU(15,"Enter the email address associated with your account to reset your password."),o.qZA(),o.TgZ(16,"div",12)(17,"span",13),o._UZ(18,"i",14),o.qZA(),o.TgZ(19,"input",15),o.NdJ("ngModelChange",function(l){return t.forgotPasswordInfo.email=l}),o.qZA()(),o.YNc(20,h,2,1,"h6",16),o.YNc(21,m,2,1,"h6",17),o.TgZ(22,"div",3)(23,"div",18)(24,"button",19),o.NdJ("click",function(){return t.forgotPassword()}),o._uU(25,"Continue "),o.TgZ(26,"span"),o.YNc(27,w,1,0,"i",20),o.qZA()(),o.TgZ(28,"button",21),o._uU(29,"Cancel"),o.qZA()()()()(),o.TgZ(30,"pre",22),o.ALo(31,"json"),o._uU(32," "),o.qZA()()()()()()),2&e&&(o.xp6(19),o.Q6J("ngModel",t.forgotPasswordInfo.email),o.xp6(1),o.Q6J("ngIf",t.errorMessage),o.xp6(1),o.Q6J("ngIf",t.successMessage),o.xp6(3),o.Q6J("disabled",!t.forgotPasswordInfo.email),o.xp6(3),o.Q6J("ngIf",t.loading),o.xp6(1),o.Q6J("routerLink",o.DdM(9,P)),o.xp6(2),o.Q6J("innerHtml",o.lcZ(31,7,t.forgotPasswordInfo),o.oJD))},dependencies:[u.O5,g.Fj,g.JJ,g.On,i.rH,u.Ts]}),s})(),pathMatch:"full"}];let Z=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({imports:[i.Bz.forChild(v),i.Bz]}),s})(),M=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({imports:[a.eY,Z]}),s})()}}]);