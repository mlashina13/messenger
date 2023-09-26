import Block from '../../core/Block';

export interface IProps {
    class: string,
}

export class Logo extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return (`<div class="{{class}}">
    <a href="/">
    <svg width="110" height="71" viewBox="0 0 110 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_11_2)">
            <rect x="9.5" y="1.5" width="57" height="37" stroke="#BEBAED" stroke-width="3" shape-rendering="crispEdges"/>
        </g>
        <rect x="17" y="67" width="58" height="38" transform="rotate(-90 17 67)" stroke="#F18C8C" stroke-width="2"/>
        <g filter="url(#filter1_d_11_2)">
            <rect x="42.5" y="23.5" width="59" height="39" stroke="#F8EA6F" shape-rendering="crispEdges"/>
        </g>
        <path d="M62.2879 56.157C61.8385 56.157 61.4323 56.0739 61.0691 55.9077C60.706 55.7384 60.4182 55.4937 60.2058 55.1737C59.9966 54.8536 59.8919 54.4612 59.8919 53.9964C59.8919 53.5964 59.9689 53.267 60.1227 53.0085C60.2766 52.75 60.4844 52.5453 60.746 52.3945C61.0076 52.2437 61.2999 52.1299 61.6231 52.0529C61.9462 51.976 62.2756 51.9175 62.611 51.8775C63.0357 51.8282 63.3804 51.7882 63.6451 51.7575C63.9098 51.7236 64.1021 51.6697 64.2222 51.5959C64.3422 51.522 64.4022 51.402 64.4022 51.2358V51.2035C64.4022 50.8003 64.2883 50.4879 64.0606 50.2663C63.8359 50.0447 63.5005 49.9339 63.0542 49.9339C62.5895 49.9339 62.2232 50.037 61.9555 50.2433C61.6908 50.4464 61.5077 50.6726 61.4061 50.9219L60.1089 50.6264C60.2628 50.1955 60.4874 49.8478 60.7829 49.5831C61.0814 49.3153 61.4246 49.1214 61.8124 49.0014C62.2002 48.8783 62.6079 48.8168 63.0357 48.8168C63.3189 48.8168 63.6189 48.8506 63.9359 48.9183C64.256 48.983 64.5546 49.103 64.8315 49.2784C65.1116 49.4538 65.3409 49.7047 65.5194 50.0309C65.6979 50.354 65.7872 50.7741 65.7872 51.2912V56H64.4391V55.0305H64.3837C64.2945 55.209 64.1606 55.3845 63.9821 55.5568C63.8036 55.7292 63.5743 55.8723 63.2943 55.9862C63.0142 56.1 62.6787 56.157 62.2879 56.157ZM62.5879 55.049C62.9696 55.049 63.2958 54.9736 63.5666 54.8228C63.8405 54.672 64.0483 54.475 64.1899 54.2319C64.3345 53.9857 64.4068 53.7225 64.4068 53.4425V52.5284C64.3576 52.5777 64.2622 52.6238 64.1206 52.6669C63.9821 52.7069 63.8236 52.7423 63.6451 52.7731C63.4666 52.8008 63.2927 52.8269 63.1234 52.8516C62.9542 52.8731 62.8126 52.8916 62.6987 52.907C62.431 52.9408 62.1863 52.9978 61.9647 53.0778C61.7462 53.1578 61.5708 53.2732 61.4384 53.424C61.3092 53.5717 61.2445 53.7687 61.2445 54.0149C61.2445 54.3565 61.3707 54.6151 61.6231 54.7905C61.8755 54.9628 62.1971 55.049 62.5879 55.049ZM67.6257 56V48.9091H68.9506V50.0632H69.0383C69.186 49.6723 69.4276 49.3677 69.7631 49.1491C70.0986 48.9276 70.5002 48.8168 70.968 48.8168C71.442 48.8168 71.839 48.9276 72.159 49.1491C72.4822 49.3707 72.7207 49.6754 72.8746 50.0632H72.9485C73.1177 49.6847 73.387 49.383 73.7563 49.1584C74.1257 48.9306 74.5658 48.8168 75.0767 48.8168C75.7199 48.8168 76.2446 49.0183 76.6509 49.4215C77.0602 49.8247 77.2649 50.4325 77.2649 51.245V56H75.8845V51.3743C75.8845 50.8942 75.7537 50.5464 75.4921 50.331C75.2305 50.1155 74.9182 50.0078 74.555 50.0078C74.1057 50.0078 73.7563 50.1463 73.5071 50.4233C73.2578 50.6972 73.1331 51.0496 73.1331 51.4805V56H71.7574V51.2866C71.7574 50.9019 71.6374 50.5926 71.3973 50.3587C71.1573 50.1248 70.8449 50.0078 70.4602 50.0078C70.1986 50.0078 69.957 50.0771 69.7354 50.2156C69.5169 50.351 69.3399 50.5402 69.2045 50.7834C69.0722 51.0265 69.006 51.3081 69.006 51.6282V56H67.6257ZM84.4285 50.6403L83.1774 50.8619C83.1251 50.7018 83.042 50.5495 82.9281 50.4048C82.8173 50.2602 82.6665 50.1417 82.4757 50.0494C82.2849 49.957 82.0464 49.9109 81.7602 49.9109C81.3693 49.9109 81.0431 49.9986 80.7815 50.174C80.5199 50.3464 80.3891 50.5695 80.3891 50.8434C80.3891 51.0804 80.4768 51.2712 80.6522 51.4158C80.8276 51.5605 81.1108 51.679 81.5016 51.7713L82.6281 52.0298C83.2805 52.1806 83.7668 52.413 84.0869 52.7269C84.4069 53.0408 84.567 53.4486 84.567 53.9503C84.567 54.375 84.4439 54.7536 84.1977 55.0859C83.9545 55.4152 83.6145 55.6738 83.1774 55.8615C82.7435 56.0492 82.2403 56.1431 81.6678 56.1431C80.8738 56.1431 80.226 55.9738 79.7243 55.6353C79.2226 55.2937 78.9149 54.8089 78.801 54.1811L80.1352 53.978C80.2183 54.3258 80.3891 54.5889 80.6476 54.7674C80.9061 54.9428 81.2431 55.0305 81.6586 55.0305C82.111 55.0305 82.4726 54.9367 82.7435 54.7489C83.0143 54.5581 83.1497 54.3258 83.1497 54.0518C83.1497 53.8303 83.0666 53.6441 82.9004 53.4933C82.7373 53.3424 82.4865 53.2286 82.1479 53.1516L80.9477 52.8885C80.286 52.7377 79.7966 52.4976 79.4796 52.1683C79.1657 51.839 79.0087 51.422 79.0087 50.9173C79.0087 50.4987 79.1257 50.1325 79.3596 49.8185C79.5935 49.5046 79.9167 49.2599 80.3291 49.0845C80.7415 48.906 81.2139 48.8168 81.7463 48.8168C82.5127 48.8168 83.1159 48.983 83.556 49.3153C83.9961 49.6446 84.2869 50.0863 84.4285 50.6403Z" fill="#F18C8C"/>
        <path d="M87.0744 56V38.5455H89.7079V53.733H97.617V56H87.0744Z" fill="#BEBAED"/>
        <defs>
            <filter id="filter0_d_11_2" x="0" y="0" width="68" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="-4" dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11_2"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11_2" result="shape"/>
            </filter>
            <filter id="filter1_d_11_2" x="42" y="23" width="68" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="4" dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11_2"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11_2" result="shape"/>
            </filter>
        </defs>
    </svg>
    </a>
</div>

        `);
  }
}