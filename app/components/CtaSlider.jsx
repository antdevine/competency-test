import styled from "styled-components";

const SliderWrapper = styled.div`
  height: 350px;
`;

const Slide = styled.div`
  inset: 0;
  opacity: 0;
  animation: fade 12s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 4s;
  }

  &:nth-child(3) {
    animation-delay: 8s;
  }

  @keyframes fade {
    0%, 10% { 
      opacity: 0;
    }
    20% { 
      opacity: 0.3;
    }
    30%, 50% { 
      opacity: 1;
    }
    60% { 
      opacity: 0.3;
    }
    70%, 100% { 
      opacity: 0;
    }
  }
`;


export default function CtaSlider({ collections }) {
    const threeCollections = collections.slice(0,3)
  return (
    <SliderWrapper className="relative w-full overflow-hidden">
        {
        threeCollections.map((item) => {
            return (
            <Slide key={item.node.id} className="absolute">
                <div className="bg-cover bg-center w-full h-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-gray-600 before:to-transparent" style={{ backgroundImage: `url(${item.node.image.url})` }}>
                    <div className="z-2 text-white text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2>{ item.node.title }</h2>
                    <p className="text-base md:text-lg leading-tight md:leading-normal">{ item.node.description }</p>
                    </div>
                    
                </div>
          </Slide>)
        }) 
        }
    </SliderWrapper>
  );
}
