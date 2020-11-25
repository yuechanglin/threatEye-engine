
export function setRedirect(per) {

  let redirect = '/404';
  //首页
  if (per.includes('1')) {
    if(per.includes('2')){
      redirect = '/home/overview';
    }else if(per.includes('995')){
     /* if(per.includes('996')){
        redirect = '/home/base_screen';
      }else if(per.includes('997')){
        redirect = '/home/top_index';
      }else if(per.includes('998')){
        redirect = '/home/aside_content';
      }*/
    }//设置
  }else if(per.includes('132')){
    if(per.includes('144')){
      redirect = '/system/account';
    }else if(per.includes('157')){
      redirect = '/system/electric';
    }else if(per.includes('162')){
      redirect = '/system/option';
    }else if(per.includes('191')){
      redirect = '/system/record';
    }else if(per.includes('207')) {
      redirect = '/system/licence';
    }
  }
  return redirect;
}
