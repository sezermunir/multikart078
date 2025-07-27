import React from 'react';
import {
  AboutUs,
  Category,
  Wishlist,
  Help,
  Home,
  Notification,
  Orders,
  Profile,
  Settings,
  Hindi, 
  Language,
  CurrencyConverter,
  Korea,
  Arabic,
  Rupees,
  Dollar,
  Euro, 
  AustralianDollar,
  KoreanWon,
  Rtl,
  DarkMode,
  Location,
  Wallet,
} from '@utils/icons';
import images from '../images/images';
import {windowHeight, windowWidth} from '@theme/appConstant';
import appColors from '@theme/appColors';
import Check from '../../assets/icons/check';

const isUserLoggedIn = true;  // Kullanıcı giriş yaptıysa true, yapmadıysa false


module.exports = {
  data: [
    {
      title: 'onBoarding.sliderText1',
      body: 'onBoarding.sliderDescription1',
      imgUrl: images.onBoarding1,
    },
    {
      title: 'onBoarding.sliderText2',
      body: 'onBoarding.sliderDescription2',
      imgUrl: images.onBoarding2,
    },
    {
      title: 'onBoarding.sliderText3',
      body: 'onBoarding.sliderDescription3',
      imgUrl: images.onBoarding3,
    },
  ],

  drawerItems: [
    {
      name: 'drawerArr.mode',
      icons: <DarkMode />,
      description: '',
      showSwitch: true,
    },

    {
      name: 'profile.pages',
      icons: <Orders />,
      description: 'profile.pagesProfile',
      showSwitch: false,
    },
    {
       name: 'drawerArr.orders',
       icons: <Orders />,
       description: 'drawerArr.orderDrawer',
       showSwitch: false,
    },
    {
      name: 'drawerArr.wishlist',
      icons: <Wishlist />,
      description: 'drawerArr.wishlistDrawer',
      showSwitch: false,
    },
    {
      name: 'drawerArr.account',
      icons: <Profile />,
      description: 'drawerArr.accountDrawer',
      showSwitch: false,
    },
    {
      name: 'drawerArr.settings',
      icons: <Settings />,
      description: 'drawerArr.settingsDrawer',
      showSwitch: false,
    },
    {
      name: 'drawerArr.aboutUs',
      icons: <AboutUs />,
      description: 'drawerArr.aboutUsDrawer',
      showSwitch: false,
    },
    {
      name: 'drawerArr.help',
      icons: <Help />,
      description: 'drawerArr.helpDrawer',
      showSwitch: false,
    },
    {
      name: 'Ödeme',
      icons: <Help />,
      description: 'Başarısız',
      showSwitch: false,
    },
  ],

  category: [
    {
      name: 'Reçel',
      image: images.category1,
      categoryImg: images.category1,
      categorySubTxt: 'Recel',
      color: appColors.divider,
      categoryId : '509079486766',
    },
    {
      name: 'Turşu',
      image: images.category2,
      categoryImg: images.category2,
      categorySubTxt: 'Tursu',
      color: appColors.categoryColor1,
      categoryId : '509079650606',

    },
    {
      name: 'Pekmez',
      image: images.category3,
      categoryImg: images.category3,
      categorySubTxt: 'Pekmez',
      color: appColors.divider,
      categoryId : '509079748910',
    },
    {
      name: 'Marmelat',
      image: images.category4,
      categoryImg: images.category4,
      categorySubTxt: 'categoryArr.kidsCollection',
      color: appColors.categoryColor2,
      categoryId : '509079814446',
    },
    {
      name: 'Yağlar',
      image: images.category5,
      categoryImg: images.category5,
      categorySubTxt: 'Yaglar',
      color: appColors.divider,
      categoryId : '509212000558',
    },
    {
      name: 'Ekşiler',
      image: images.category9,
      categoryImg: images.category9,
      categorySubTxt: 'Eksiler',
      color: appColors.categoryColor3,
      categoryId : '509212328238',
    },
    {
      name: 'Salça',
      image: images.category6,
      categoryImg: images.category6,
      categorySubTxt: 'Salca',
      color: appColors.divider,
      categoryId : '509213278510',
    },
    {
      name: 'Kahvaltılıklar',
      image: images.category14,
      categoryImg: images.category14,
      categorySubTxt: 'Kahvaltiliklar',
      color: appColors.divider,
      categoryId : '509212590382',
    },
    {
      name: 'Sirkeler',
      image: images.category12,
      categoryImg: images.category12,
      categorySubTxt: 'Sirkeler',
      color: appColors.divider,
      categoryId : '509213409582',
    },
    {
      name: 'Bakliyat',
      image: images.category8,
      categoryImg: images.category8,
      categorySubTxt: 'Bakliyat',
      color: appColors.divider,
      categoryId : '509253943598',
    },
    {
      name: 'İçecekler',
      image: images.category10,
      categoryImg: images.category10,
      categorySubTxt: 'Icecekler',
      color: appColors.divider,
      categoryId : '509244342574',
    },
    {
      name: 'Cezerye',
      image: images.category13,
      categoryImg: images.category13,
      categorySubTxt: 'Cezerye',
      color: appColors.divider,
      categoryId : '509244604718',
    },
    {
      name: 'Meyve',
      image: images.category11,
      categoryImg: images.category11,
      categorySubTxt: 'Meyve',
      color: appColors.divider,
      categoryId : '509254435118',
    },
    {
      name: 'Sabun',
      image: images.category7,
      categoryImg: images.category7,
      categorySubTxt: 'Sabun',
      color: appColors.divider,
      categoryId : '509253779758',
    },
  ],

  bannerSection: [{image: images.banner1Image}, {image: images.banner2Image}, {image: images.banner3Image}],

  dealsOfDaySection: [
    {
      image: images.dealOfTheDay1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      image: images.dealOfTheDay2,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      image: images.dealOfTheDay3,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
  ],

  findYourStyleFilter: [
    {title: 'findYourStyleArr.trendingNow'},
    {title: 'findYourStyleArr.topPicks'},
    {title: 'findYourStyleArr.featuredProducts'},
    {title: 'findYourStyleArr.topRated'},
    {title: 'findYourStyleArr.readyToShip'},
  ],

  findYourStyle: [
    {
      id: 1,
      image: images.findStyle1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 1,
      image: images.findStyle2,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      id: 1,
      image: images.findStyle3,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
    {
      id: 1,
      image: images.findStyle4,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 2,
      image: images.findStyle2,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 2,
      image: images.findStyle4,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 3,
      image: images.findStyle3,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 4,
      image: images.findStyle4,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 5,
      image: images.findStyle1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 5,
      image: images.findStyle3,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
  ],

  biggestDeal: [
    {brand: images.biggestDeal1, darkBrand: images.biggestDealDark1},
    {brand: images.biggestDeal2, darkBrand: images.biggestDealDark2},
    {brand: images.biggestDeal3, darkBrand: images.biggestDealDark3},
    {brand: images.biggestDeal4, darkBrand: images.biggestDealDark4},
    {brand: images.biggestDeal5, darkBrand: images.biggestDealDark5},
    {brand: images.biggestDeal6, darkBrand: images.biggestDealDark6},
    {brand: images.biggestDeal7, darkBrand: images.biggestDealDark3},
    {brand: images.biggestDeal8, darkBrand: images.biggestDealDark2},
    {brand: images.biggestDeal9, darkBrand: images.biggestDealDark1},
  ],

  offerCorner: [
    {
      name: 'offerCornerArr.under',
    },
    {
      name: 'offerCornerArr.flat',
    },
    {
      name: 'offerCornerArr.buyGet',
    },
    {
      name: 'offerCornerArr.upto',
    },
  ],

  kidsCorner: [
    {
      image: images.kidsCorner1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      image: images.kidsCorner2,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      image: images.kidsCorner3,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
  ],

  langauges: [
    {key: 'hi', name: 'langaugesArr.hindi', icons: <Hindi />},
    {
      key: 'en',
      name: 'langaugesArr.english',
      icons: <Language width={windowWidth(34)} height={windowHeight(34)} />,
    },
    {key: 'kr', name: 'langaugesArr.korean', icons: <Korea />},
    {key: 'ar', name: 'langaugesArr.arabic', icons: <Arabic />},
  ],

  currencys: [
    {
      key: '₹',
      name: 'currencyConverterArr.indianRupees',
      icons: <Rupees />,
      value: 1,
    },
    {
      key: '$',
      name: 'currencyConverterArr.usDollar',
      icons: <Dollar />,
      value: 0.013,
    },
    {
      key: '€',
      name: 'currencyConverterArr.euro',
      icons: <Euro />,
      value: 0.012,
    },
    {
      key: 'A$',
      name: 'currencyConverterArr.australianDollar',
      icons: <AustralianDollar />,
      value: 0.018,
    },
    {
      key: '₩',
      name: 'currencyConverterArr.koreanWon',
      icons: <KoreanWon />,
      value: 16.44,
    },
  ],

  ratings: [{}, {}, {}, {}, {}],

  subCategory: [
    {
      name: 'subCategoryArr.funsionWear',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.tunics'},
        {name: 'innerCategoryArr.halterTops'},
        {name: 'innerCategoryArr.spaghettiKurtas'},
        {name: 'innerCategoryArr.capes'},
        {name: 'innerCategoryArr.fusionGowns'},
        {name: 'innerCategoryArr.nightwear'},
        {name: 'innerCategoryArr.handbags'},
      ],
    },
    {
      name: 'subCategoryArr.westernWear',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.tunics'},
        {name: 'innerCategoryArr.halterTops'},
        {name: 'innerCategoryArr.spaghettiKurtas'},
        {name: 'innerCategoryArr.capes'},
        {name: 'innerCategoryArr.fusionGowns'},
        {name: 'innerCategoryArr.nightwear'},
        {name: 'innerCategoryArr.handbags'},
      ],
    },
    {
      name: 'subCategoryArr.lingerieSleepwear',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.tunics'},
        {name: 'innerCategoryArr.halterTops'},
        {name: 'innerCategoryArr.spaghettiKurtas'},
        {name: 'innerCategoryArr.capes'},
        {name: 'innerCategoryArr.fusionGowns'},
        {name: 'innerCategoryArr.nightwear'},
        {name: 'innerCategoryArr.handbags'},
      ],
    },
    {
      name: 'subCategoryArr.footWear',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.tunics'},
        {name: 'innerCategoryArr.halterTops'},
      ],
    },
    {
      name: 'subCategoryArr.sportsAndActive',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
      ],
    },
    {
      name: 'subCategoryArr.beautyAndCare',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.tunics'},
        {name: 'innerCategoryArr.halterTops'},
        {name: 'innerCategoryArr.spaghettiKurtas'},
      ],
    },
    {
      name: 'subCategoryArr.jewellery',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.tunics'},
        {name: 'innerCategoryArr.halterTops'},
        {name: 'innerCategoryArr.spaghettiKurtas'},
        {name: 'innerCategoryArr.capes'},
      ],
    },
    {
      name: 'subCategoryArr.gadgets',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.tunics'},
      ],
    },
    {
      name: 'subCategoryArr.plusSize',
      innerCat: [
        {name: 'innerCategoryArr.maxiDresses'},
        {name: 'innerCategoryArr.skirts'},
        {name: 'innerCategoryArr.cropTops'},
        {name: 'innerCategoryArr.fusionGowns'},
        {name: 'innerCategoryArr.nightwear'},
        {name: 'innerCategoryArr.handbags'},
      ],
    },
  ],

  cartList: [
    {
      image: images.product1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      image: images.product16,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      image: images.product15,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
  ],

  mayLike: [
    {
      image: images.product14,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      image: images.product15,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      image: images.product16,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
  ],

  wishlist: [
    {
      image: images.product1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      image: images.product15,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      image: images.findStyle2,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
    {
      image: images.kidsCorner2,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      image: images.dealOfTheDay3,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      image: images.dealOfTheDay1,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
  ],

  profileItems: [
    {
      name: 'drawerArr.mode',
      icons: <DarkMode />,
      description: '',
      showSwitch: true,
    },
    {
      name: 'Kampanyalar',
      icons: <Wishlist />,
      description: 'drawerArr.wishlistDrawer',
      showSwitch: false,
    },
    {
       name: 'Geçmiş Siparişlerim',
       icons: <Orders />,
       description: 'drawerArr.orderDrawer',
       showSwitch: false,
    },
    {
      name: 'Favorilerim',
      icons: <Wishlist />,
      description: 'drawerArr.wishlistDrawer',
      showSwitch: false,
    },
     {
       name: 'profile.savedAddress',
       icons: <Location />,
       description: 'profile.addProfile',
       showSwitch: false,
    },
    {
      name: 'profile.pages',
      icons: <Orders />,
      description: 'profile.pagesProfile',
      showSwitch: false,
    },
    
    
    
   

    {
      name: 'drawerArr.settings',
      icons: <Settings />,
      description: 'drawerArr.settingsDrawer',
      showSwitch: false,
    },

    {
      name: 'profile.termsConditions',
      icons: <AboutUs />,
      description: 'profile.termsProfile',
      showSwitch: false,
    },
    {
      name: 'drawerArr.help',
      icons: <Help />,
      description: 'drawerArr.helpDrawer',
      showSwitch: false,
    },
    
  ],

  recentSearch: [
    {result: 'products.productName1'},
    {result: 'products.productName2'},
    {result: 'products.productName3'},
  ],

  recommended: [
    {id: 0, name: 'recommendedArr.denim'},
    {id: 1, name: 'recommendedArr.skirts'},
    {id: 2, name: 'recommendedArr.flowerprint'},
    {id: 3, name: 'recommendedArr.jeans'},
    {id: 4, name: 'recommendedArr.jumpsuit'},
  ],

  trendingCategory: [
    {name: 'recommendedArr.flowerprint', category: images.flowerprint},
    {name: 'recommendedArr.denim', category: images.denim},
    {name: 'recommendedArr.skirts', category: images.skirts},
  ],

  topBrands: [
    {brand: images.brand1, darkBrand: images.biggestDealDark1},
    {brand: images.brand2, darkBrand: images.biggestDealDark2},
    {brand: images.brand3, darkBrand: images.biggestDealDark3},
    {brand: images.brand4, darkBrand: images.biggestDealDark4},
    {brand: images.brand5, darkBrand: images.biggestDealDark5},
    {brand: images.brand6, darkBrand: images.biggestDealDark6},
  ],
  order: [
    {
      image: images.product15,
      name: 'orderSuccess.ordername',
      size: 'sizes.small',
      price: '32.00',
      quantity: 1,
    },
    {
      image: images.product16,
      name: 'orderSuccess.ordername',
      size: 'sizes.small',
      price: '32.00',
      quantity: 1,
    },
  ],
  openOrders: [
    {
      image: images.product15,
      orderName: 'products.productName1',
      size: 'sizes.small',
      date: 'orderHistory.orderDate',
      deliveryStatus: 'orderHistory.dispatched',
      orderStatus: 'orderHistory.ongoing',
      quantity: 1,
    },
    {
      image: images.product16,
      orderName: 'products.productName1',
      size: 'sizes.small',
      date: 'orderHistory.orderDate',
      deliveryStatus: 'orderHistory.ontheway',
      orderStatus: 'orderHistory.ongoing',
      quantity: 1,
    },
  ],
  pastOrders: [
    {
      image: images.product14,
      orderName: 'products.productName1',
      size: 'sizes.small',
      date: 'orderHistory.orderDate',
      deliveryStatus: 'orderHistory.delivered',
      orderStatus: 'orderHistory.ongoing',
      quantity: 1,
    },
    {
      image: images.product18,
      orderName: 'products.productName1',
      size: 'sizes.small',
      date: 'orderHistory.orderDate',
      deliveryStatus: 'orderHistory.delivered',
      orderStatus: 'orderHistory.ongoing',
      quantity: 1,
    },
  ],
  orderTrackerData: [
    {
      title: 'Out For Delivery',
      description: 'expected delivery on monday',
    },
    {title: 'In Transit', description: '10.00 am, 21/05/2020', icon: <Check />},
    {
      title: 'Ready To Ship',
      description: '12.00 am, 20/05/2020',
      icon: <Check />,
    },
    {title: 'Ordered', description: '20/05/2020', icon: <Check />},
  ],
  productSection: [
    {id: 0, image: images.product1},
    {id: 0, image: images.product2},
    {id: 0, image: images.product4},
    {id: 1, image: images.product5},
    {id: 1, image: images.product6},
    {id: 1, image: images.product7},
    {id: 2, image: images.noData},
  ],
  sizes: [
    {id: 0, name: 'sizes.small'},
    {id: 1, name: 'sizes.midium'},
    {id: 2, name: 'sizes.large'},
    {id: 3, name: 'sizes.xlarge'},
  ],
  selectColors: [
    {id: 0, color: '#E6E6FA'},
    {id: 1, color: '#F5F5F5'},
    {id: 2, color: '#B0C4DE'},
  ],
  productDetails: [
    {name: 'productDetail.product', content: 'productDetail.content'},
    {name: 'productDetail.product1', content: 'productDetail.content1'},
    {name: 'productDetail.product2', content: 'productDetail.content2'},
  ],
  customerReview: [
    {
      image: images.person,
      name: 'customerReview.name',
      date: 'customerReview.date',
      review: 'customerReview.review',
      size: 'sizes.small',
      like: 20,
      disLike: 2,
    },
    {
      image: images.person,
      name: 'customerReview.name',
      date: 'customerReview.date',
      review: 'customerReview.review1',
      size: 'sizes.xlarge',
      like: 20,
      disLike: 2,
    },
  ],
  cupons: [
    {
      name: 'OffersForYou.MULTIKART10',
      amount: '20.00',
      disc: 'cupons.multikartDisc',
    },
    {
      name: 'cupons.welcome',
      amount: '22.00',
      disc: 'cupons.welcomeDesc',
    },
    {
      name: 'cupons.Lucky50',
      amount: '32.00',
      disc: 'cupons.LUCKYDesc',
    },
    {
      name: 'cupons.SummerSale',
      amount: '15.00',
      disc: 'cupons.SummerSaleDesc',
    },
  ],
  notification: [
    {
      title: 'notification.all',
    },
    {
      title: 'notification.orderInfo',
    },
    {
      title: 'notification.Offers',
    },
    {
      title: 'notification.payment',
    },
  ],
  notificationList: [
    {
      id: 0,
      image: images.product19,
      title: 'Exclusive Brand Day Sale!! HURRY, LIMITED period offer!',
      date: '10 July, 2021',
      newNotification: true,
    },
    {
      id: 0,
      image: images.product15,
      title:
        'Order Placed successfully. It will be delivered on Mon 15 July, 2021',
      date: '5 July, 2021',
      newNotification: true,
    },
    {
      id: 0,
      image: images.product20,
      title: 'We have got coupons. collect now and save extras !!!',
      date: '5 June, 2021',
      newNotification: true,
    },
    {
      id: 0,
      image: images.product21,
      title:
        'Payment Failed. You can retry making a payment on order sections.',
      date: '20 April, 2021',
      newNotification: false,
    },
    {
      id: 0,
      image: images.product22,
      title: 'Exclusive Brand Day Sale!! HURRY, LIMITED period offer!',
      date: '10 July, 2021',
      newNotification: false,
    },
    {
      id: 0,
      image: images.product15,
      title:
        'Your order is delivered on time. for any further assistance please contact us. ',
      date: '5 July, 2021',
      newNotification: true,
    },
    {
      id: 0,
      image: images.product15,
      title: 'We have got coupons. collect now and save extras !!!',
      date: '5 June, 2021',
      newNotification: false,
    },
    {
      id: 0,
      image: images.product20,
      title:
        'Payment Failed. You can retry making a payment on order sections.',
      date: '20 April, 2021',
      newNotification: false,
    },
    {
      id: 1,
      image: images.product15,
      title:
        'Order Placed successfully. It will be delivered on Mon 15 July, 2021',
      date: '5 July, 2021',
      newNotification: true,
    },
    {
      id: 1,
      image: images.product19,
      title: 'Exclusive Brand Day Sale!! HURRY, LIMITED period offer!',
      date: '10 July, 2021',
      newNotification: false,
    },
    {
      id: 1,
      image: images.product15,
      title:
        'Your order is delivered on time. for any further assistance please contact us. ',
      date: '5 July, 2021',
      newNotification: true,
    },
    {
      id: 2,
      image: images.product19,
      title: 'Exclusive Brand Day Sale!! HURRY, LIMITED period offer!',
      date: '10 July, 2021',
      newNotification: true,
    },
    {
      id: 2,
      image: images.product15,
      title:
        'Order Placed successfully. It will be delivered on Mon 15 July, 2021',
      date: '5 July, 2021',
      newNotification: true,
    },
    {
      id: 2,
      image: images.product20,
      title:
        'Payment Failed. You can retry making a payment on order sections.',
      date: '20 April, 2021',
      newNotification: false,
    },
    {
      id: 3,
      image: images.product19,
      title: 'Exclusive Brand Day Sale!! HURRY, LIMITED period offer!',
      date: '10 July, 2021',
      newNotification: true,
    },
    {
      id: 3,
      image: images.product20,
      title:
        'Payment Failed. You can retry making a payment on order sections.',
      date: '20 April, 2021',
      newNotification: false,
    },
  ],
  offers: [
    {
      offerDesc: 'paymentDetails.offerDesc',
      showMore: false,
    },
    {
      offerDesc: 'paymentDetails.promotionDesc',
      showMore: false,
    },
    {
      offerDesc: 'paymentDetails.offerDesc',
      showMore: true,
    },
    {
      offerDesc: 'paymentDetails.promotionDesc',
      showMore: true,
    },
  ],
  paymentOption: [
    {
      image: images.credit,
      name: 'Kredi Kartı ile ödeme',
      darkImg: images.creditDark,
      value: 'iyzico',
      selected:false
      
    },
    {
      image: images.cash,
      name: 'Havale/EFT ile ödeme',     
       darkImg: images.cashDark,
       value: 'money_order',
       selected:true
    },
    {
      image: images.wallets,
      name: 'Kapıda Ödeme',
      darkImg: images.walletsDark,
      value: 'cod',
      selected:false
    },
    // {
    //   image: images.netBanking,
    //   name: 'paymentDetails.netBanking',
    //   darkImg: images.netBankingDark,
    //   selected:false
    // },
  ],
  paymentwallets: [
    {
      id: 0,
      name: 'wallets.commercialBank',
      selected: true,
    },
    {
      id: 1,
      name: 'wallets.constructionBank',
      selected: false,
    },
    {
      id: 2,
      name: 'wallets.agriculturalBank',
      selected: false,
    },
    {
      id: 3,
      name: 'wallets.hsbcholdings',
      selected: false,
    },
    {
      id: 4,
      name: 'wallets.bankAmerica',
      selected: false,
    },
    {
      id: 5,
      name: 'wallets.jpMorgan',
      selected: false,
    },
  ],
  chooseBank: [
    {
      id: 0,
      name: 'wallets.chooseBank',
    },
    {
      id: 1,
      name: 'wallets.ICICI',
    },
    {
      id: 2,
      name: 'wallets.BOB',
    },
  ],
  netBankingData: [
    {
      id: 0,
      name: 'netBanking.adyen',
    },
    {
      id: 1,
      name: 'netBanking.airtelMoney',
    },
    {
      id: 2,
      name: 'netBanking.alliedWallet',
    },
    {
      id: 3,
      name: 'netBanking.applePay',
    },
    {
      id: 4,
      name: 'netBanking.brinks',
    },
    {
      id: 5,
      name: 'netBanking.cardFree',
    },
  ],
  country: [
    {
      id: 0,
      name: 'addNewAddress.newZealand',
    },
    {
      id: 1,
      name: 'addNewAddress.australia',
    },
    {
      id: 2,
      name: 'addNewAddress.india',
    },
  ],

  states: [
    {
      id: 0,
      name: 'addNewAddress.Selectstate',
    },
    {
      id: 1,
      name: 'addNewAddress.gujarat',
    },
    {
      id: 2,
      name: 'addNewAddress.punjab',
    },
  ],
  addressTypes: [
    {id: 0, name: 'addNewAddress.home', selected: true},
    {id: 1, name: 'addNewAddress.office', selected: false},
    {id: 2, name: 'addNewAddress.others', selected: false},
  ],
  deliveryDetails: [
    {
      id: 0,
      area: 'ShippingDetails.area',
      address: 'orderSuccess.address',
      phoneNo: '903-239-1284',
      deliveryService: 'addNewAddress.home',
    },
    {
      id: 1,
      area: 'deliveryDetails.area',
      address: 'deliveryDetails.address',
      phoneNo: '317-898-0622',
      deliveryService: 'addNewAddress.office',
    },
  ],
  expectedDeliveryData: [
    {
      id: 0,
      name: 'products.productName1',
      date: '25th July',
      image: images.product15,
    },
    {
      id: 1,
      name: 'products.productName1',
      date: '25th July',
      image: images.product16,
    },
  ],
  helpCenter: [
    {
      quetion: 'helpCenter.trackOrderQuetion',
    },
    {
      quetion: 'helpCenter.manageOrderQuetion',
    },
    {
      quetion: 'helpCenter.credit/debitQuetion',
    },
    {
      quetion: 'helpCenter.otherIssues',
    },
    {
      quetion: 'helpCenter.walletPayQuetion',
    },
    {
      quetion: 'helpCenter.unsubscribeSms',
  
    },
    {
      quetion: 'helpCenter.refunds',
    },
  ],
  termsConditions: [
    {content: 'termsCondition.restrictionContent'},
    {content: 'termsCondition.restrictionContent1'},
    {content: 'termsCondition.restrictionContent2'},
    {content: 'termsCondition.restrictionContent3'},
    {content: 'termsCondition.restrictionContent4'},
    {content: 'termsCondition.restrictionContent5'},
    {content: 'termsCondition.restrictionContent6'},
    {content: 'termsCondition.restrictionContent7'},
  ],
  gender: [
    {id: 0, name: 'profileSettings.male'},
    {id: 1, name: 'profileSettings.female'},
    {id: 2, name: 'profileSettings.other'},
  ],

  categorys: [
    {
      id: 1,
      image: images.findStyle3,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
      newProduct: 'shopPage.newProduct',
    },
    {
      id: 2,
      image: images.findStyle4,
      title: 'products.productName2',
      brandName: 'products.productBrand2',
      discountPrice: 'products.productDiscountPrice2',
      price: 'products.productPrice2',
      discount: 'products.productDiscount2',
    },
    {
      id: 3,
      image: images.findStyle1,
      title: 'products.productName3',
      brandName: 'products.productBrand3',
      discountPrice: 'products.productDiscountPrice3',
      price: 'products.productPrice3',
      discount: 'products.productDiscount3',
    },
    {
      id: 4,
      image: images.findStyle2,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
      newProduct: 'shopPage.newProduct',
    },
    {
      id: 5,
      image: images.kidsCorner1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 6,
      image: images.product1,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 7,
      image: images.kidsCorner3,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
    {
      id: 8,
      image: images.kidsCorner2,
      title: 'products.productName1',
      brandName: 'products.productBrand1',
      discountPrice: 'products.productDiscountPrice1',
      price: 'products.productPrice1',
      discount: 'products.productDiscount1',
    },
  ],

  sortBy: [
    {
      id: 0,
      name: 'shopPage.recommended',
    },
    {
      id: 1,
      name: 'shopPage.popularity',
    },
    {
      id: 2,
      name: 'shopPage.WhatsNew',
    },
    {
      id: 3,
      name: 'shopPage.hightToLow',
    },
    {
      id: 4,
      name: 'shopPage.lowToHigh',
    },
    {
      id: 5,
      name: 'shopPage.customerRating',
    },
  ],

  brands: [
    {
      id: 0,
      name: 'shopPage.here&Now',
    },
    {
      id: 1,
      name: 'shopPage.zara',
    },
    {
      id: 2,
      name: 'shopPage.mast&harbour',
    },
    {
      id: 3,
      name: 'shopPage.tokyoTalkies',
    },
    {
      id: 4,
      name: 'shopPage.vogue',
    },
    {
      id: 5,
      name: 'shopPage.gucci',
    },
  ],
  size: [
    {
      id: 0,
      name: 'sizes.smallSize',
    },
    {
      id: 1,
      name: 'sizes.medium',
    },
    {
      id: 2,
      name: 'sizes.largeSize',
    },
    {
      id: 3,
      name: 'sizes.large',
    },
    {
      id: 4,
      name: 'sizes.2xl',
    },
  ],
  Colors: [
    {id: 0, color: '#E6E6FA'},
    {id: 1, color: '#F5F5F5'},
    {id: 2, color: '#B0C4DE'},
    {id: 3, color: '#EBACA2'},
    {id: 4, color: '#FFC0CB'},
    {id: 5, color: '#ADD8E6'},
    {id: 6, color: '#BED3C3'},
    {id: 7, color: '#9FD9F2'},
    {id: 8, color: '#F5DEB3'},
    {id: 9, color: '#FFE4E1'},
    {id: 10, color: '#E6E6FA'},
  ],
  Occasions: [
    {
      id: 0,
      name: 'shopPage.casual',
    },
    {
      id: 1,
      name: 'shopPage.sports',
    },
    {
      id: 2,
      name: 'shopPage.beachWear',
    },
    {
      id: 3,
      name: 'shopPage.loungeWear',
    },
    {
      id: 4,
      name: 'shopPage.formal',
    },
    {
      id: 5,
      name: 'shopPage.party',
    },
  ],
  paymentSlider: [
    {
      id: 0,
      image: images.blueCard,
      cardName: 'paymentCard.creditCard',
      bankName: 'paymentCard.bankName',
      creditNumber: '1234   5678  ****    9123  ',
    },
    {
      id: 1,
      image: images.yellowCard,
      cardName: 'paymentCard.creditCard',
      bankName: 'paymentCard.bankName',
      creditNumber: '1234   5678  ****  9123  ',
    },
    {
      id: 2,
      image: images.purpleCard,
      cardName: 'paymentCard.creditCard',
      bankName: 'paymentCard.bankName',
      creditNumber: '1234   5678  ****  9123  ',
    },
  ],
  wallets: [
    {
      image: images.paytmLogo,
      name: 'paymentCard.paytmWallet',
      amount: '$25',
    },
    {
      image: images.cashLogo,
      name: 'paymentCard.cashApp',
      amount: '$25',
    },
    {
      image: images.googleLogo,
      name: 'paymentCard.googleWallet',
      amount: '$25',
    },
  ],

  pages: [
    ...(isUserLoggedIn
      ? []
      : [
    {
      title: 'ÜYELİK',
      // subtitle: 'pages.onBoardingDesc',
      innerPages: [
        //{screen: 'onBoarding', title: 'pages.onBoarding'},
        {screen: 'LoginScreen', title: 'pages.login'},
        {screen: 'RegistrationScreen', title: 'register.signUp'},
        {screen: 'ForgotPasswordScreen', title: 'authComman.forgotPassword'},
        //{screen: 'ResetpasswordScreen', title: 'resetPassword.resetPassword'},
        //{screen: 'onBoarding', title: 'pages.otp'},
      ],
    },
  ]),
    {
      title: 'pages.homeProduct',
      //subtitle: 'pages.homeProductDesc',
      innerPages: [
        //{screen: 'Drawer', title: 'tabBar.home'},
        {screen: 'CategoryStackScreen', title: 'category.categories'},
        //{screen: 'innerCategory', title: 'pages.innerCategory'}, 
        {screen: 'Search', title: 'search.search'},
        //{screen: 'ShopPage', title: 'pages.shop'},
        //{screen: 'Product', title: 'pages.products'},
      ],
    },
    {
      title: 'pages.cartOrderPayment',
      subtitle: 'pages.cartOrderDesc',
      innerPages: [
        {screen: 'cart', title: 'tabBar.cart'},
        //{screen: 'EmptyCart', title: 'pages.emptyCart'},
        //{screen: 'ApplyCoupon', title: 'cart.applyCoupons'},
        //{screen: 'wishList', title: 'tabBar.wishList'},
        //{screen: 'OrderHistory', title: 'orderHistory.orderHistory'},
        //{screen: 'AddNewAddress', title: 'addNewAddress.addNewAddress'},
        //{screen: 'Payment', title: 'notification.payment'},
        //{screen: 'OrderSuccessful', title: 'pages.orderSuccess'},
      ],
    },
    //{
    //title: 'profile.profileSetting',
    //subtitle: 'pages.profileDesc',
    //  innerPages: [
    //    {screen: 'profile', title: 'profile.profile'},
    //    {screen: 'ProfileSettings', title: 'profile.profileSetting'},
        
    //    {screen: 'orderScreen', title: 'pages.ordertrack'},
    //    {screen: 'EmptyCart', title: 'pages.noOrder'},
    //  ],
    //},
    {
      title: 'pages.otherPages',
      subtitle: 'pages.otherPageDesc',
      innerPages: [
        {screen: 'TermsCondition', title: 'profile.termsConditions'},
        {screen: 'HelpCenter', title: 'pages.help'},
        {screen: 'AboutUs', title: 'drawerArr.aboutUs'},
      ],
    },
  ],
  Settings: [
    {
      id: 0,
      name: 'drawerArr.mode',
      switchType: 'darkMode',
    },
  ],
  orderFilters: [
    {
      id: 0,
      name: 'orderFilter.allOrders',
    },
    {
      id: 1,
      name: 'orderFilter.openOrders',
    },
    {
      id: 2,
      name: 'orderFilter.returnOrders',
    },
    {
      id: 3,
      name: 'orderFilter.cancelledOrders',
    },
  ],
  timeFilter: [
    {
      id: 0,
      name: 'orderFilter.last30days',
    },
    {
      id: 1,
      name: 'orderFilter.last6months',
    },
    {
      id: 2,
      name: 2021,
    },
    {
      id: 3,
      name: 2023,
    },
  ],
};
