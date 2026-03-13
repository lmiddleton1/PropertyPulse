import InfoBox from "./InfoBox";

const InfoBoxes = () => {
    return (

    <section className="py-8">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

        <InfoBox heading='For Renters' buttonInfo={{
          text: 'Browse Properties',
          link: '/properties',
        }}>
          Find your dream rental property. Bookmark properties and contact owners.
        </InfoBox>
        <InfoBox
          heading='For Property Owners'
          backgroundColor='bg-gray-900'
          buttonInfo={{
            text: 'Add Property',
            link: '/properties/add',
          }}
        >
          List your properties and reach potential tenants. Rent as a holiday let or long term.
        </InfoBox>


        </div>
      </div>
    </section>

     );
}

export default InfoBoxes;
