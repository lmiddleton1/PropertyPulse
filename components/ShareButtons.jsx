'use client';
import {
  FacebookShareButton,
  XShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  EmailIcon,

} from 'react-share'
const ShareButtons = ( { property}) => {

  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;




    return ( 

<>

<div className="flex gap-3 justify-start">

<FacebookShareButton
url={shareUrl}
quote={property.name}
hashtags={`#${property.type.replace(/\s/g, '')}ForRent`}>

<FacebookIcon size={40} round={true} />


</FacebookShareButton>

<XShareButton
url={shareUrl}
title={property.name}
hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
>

<XIcon size={40} round={true} />
</XShareButton>


<WhatsappShareButton
url={shareUrl}
title={property.name}
seperator='::'
>

<WhatsappIcon size={40} round={true} />
</WhatsappShareButton>


<EmailShareButton
url={shareUrl}
subject={property.name}
body={`Check out this property listing: ${shareUrl}`}
>

<EmailIcon size={40} round={true} />
</EmailShareButton>


</div>



</>

     );
}
 
export default ShareButtons;