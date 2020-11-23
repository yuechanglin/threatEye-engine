export const formatList = (asynRoutes,auths) => {

  return asynRoutes.filter(route =>{
    /*for(let value of auths){
      if(value.id == route.meta.auth){
        if(route.children){
          route.children = formatList(route.children,value.child_menu);
        }
        return true;
        break;
      }
    }*/
    if(auths.includes(route.meta.auth)){
      if(route.children){
          route.children = formatList(route.children,auths);
      }
      return true;
    }
  })

}
