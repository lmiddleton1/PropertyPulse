const InfoBox = ({heading, backgroundColor='bg-gray-800', textColor = 'text-white', buttonInfo, children}) => {
    return (

            <div className={`${backgroundColor} p-8 rounded-2xl shadow-sm border border-gray-700/50`}>
              <h2 className={`${textColor} text-2xl font-bold mb-3`}>{heading}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{children}</p>
            <a
              href={buttonInfo.link}
              className="inline-block border border-white/30 text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors">
             {buttonInfo.text}
            </a>
          </div>

    );
}

export default InfoBox;
