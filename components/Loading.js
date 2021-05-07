import { Circle } from "better-react-spinkit"


function Loading() {
    return (
        <centre styles={{width: '100%', height:"100%"}}>
            <div 
            style={{ display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "25vh"}}
            height={200}
            >
            <img 
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
              alt=""
              style={{marginBottom: 10}}
              height={200}
            />
            <Circle color ="#3CBC28" size= {60} 
            />
            </div>
        </centre>
        
    )
}

export default Loading
