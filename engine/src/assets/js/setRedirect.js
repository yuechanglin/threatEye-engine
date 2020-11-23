
export function setRedirect(per) {

  let redirect = '/404';
  //首页
  if (per.includes('1')) {
    if(per.includes('2')){
      redirect = '/home/overview';
    }else if(per.includes('995')){
      if(per.includes('996')){
        redirect = '/home/base_screen';
      }else if(per.includes('997')){
        redirect = '/home/top_index';
      }else if(per.includes('998')){
        redirect = '/home/aside_content';
      }
    }
  //处置
  }else if(per.includes('13')){

    if(per.includes('14')){
      redirect = '/handle/assets';
    }else if(per.includes('23')){
      if(per.includes('24')){
        redirect = '/handle/risks/outside';
      }else if(per.includes('32')){
        redirect = '/handle/risks/lateral';
      }else if(per.includes('40')){
        redirect = '/handle/risks/outreath';
      }
    }else if(per.includes('48')){
      redirect = '/handle/works';
    }
    //告警
  }else if(per.includes('58')){

    if(per.includes('59')){
      redirect = '/emerge/network';
    }

    //追查
  }else if(per.includes('76')){

    if(per.includes('77')){
      redirect = '/invest/dns';
    }else if(per.includes('81')){
      redirect = '/invest/url';
    }else if(per.includes('85')){
      redirect = '/invest/host';
    }else if(per.includes('93')){
      redirect = '/invest/user';
    }else if(per.includes('97')){
      redirect = '/invest/file';
    }else if(per.includes('101')){
      redirect = '/invest/data';
    }else if(per.includes('105')){
      redirect = '/invest/flow';
    }else if(per.includes('109')){
      redirect = '/invest/ioc';
    }else if(per.includes('117')){
      redirect = '/invest/sandbox';
    }

    //报表
  }else if(per.includes('123')){

    if(per.includes('124')){
      redirect = '/report/create';
    }else if(per.includes('130')){
      redirect = '/report/sending';
    }

    //系统
  }else if(per.includes('132')){

    if(per.includes('133')){
      redirect = '/system/manage';
    }else if(per.includes('139')){
      redirect = '/system/monitor';
    }else if(per.includes('144')){
      redirect = '/system/account';
    }else if(per.includes('157')){
      redirect = '/system/electric';
    }else if(per.includes('162')){
      redirect = '/system/option';
    }else if(per.includes('169')){
      redirect = '/system/rule';
    }else if(per.includes('183')){
      redirect = '/system/react';
    }else if(per.includes('187')){
      redirect = '/system/threat';
    }else if(per.includes('191')){
      redirect = '/system/record';
    }else if(per.includes('204')){
      redirect = '/system/resume';
    }else if(per.includes('207')) {
      redirect = '/system/licence';
    }else if(per.includes('290')) {
      redirect = '/system/label';
    }
  }
  return redirect;
}
