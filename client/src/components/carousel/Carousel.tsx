import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import heroGuy from '../../assets/heroguy.jpg';
import Trails, { ITrails } from '../../sections/trails-section/trail-list';
import CarouselSlides from './CarouselSlides';

function filterByRelevancy(trails: ITrails[], relevancy: filterType) {
  const filteredTrails = trails.filter((trail) => trail.relevancy === relevancy);
  const defaultTrails = {
    name: 'More Trail Coming',
    price: 0,
    route: 'defaultRoute',
    previewSrc: heroGuy,
    location: 'More Trail Coming Soon',
    elevation: '0',
    duration: 0,
    length: '0',
    trailType: 'N/A',
    difficulty: 'N/A',
    rating: 0,
    description: 'Loremloremloremlorem',
    relevancy: relevancy,
  };

  while (filteredTrails.length < 12) filteredTrails.push({ ...defaultTrails });

  return filteredTrails;
}

export function Carousel() {
  const [selectedRelevancy, setSelectedRelevancy] = useState<filterType>('popular');
  const FilteredTrails = useMemo(() => filterByRelevancy(Trails, selectedRelevancy), [Trails, selectedRelevancy]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToScroll, setSlidesToScroll] = useState(1);

  // const slidesToScroll = 1;
  const totalScroll = FilteredTrails.length / slidesToScroll - 1; //minus 1 cause it's already showing the first half

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll,
  });

  useEffect(() => {
    // handle how many slides to scroll on breakpoints
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToScroll(4);
      } else if (width >= 768) {
        setSlidesToScroll(3);
      } else if (width >= 640) {
        setSlidesToScroll(2);
      } else {
        setSlidesToScroll(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevValue) => prevValue - 1);
      if (emblaApi) emblaApi.scrollPrev();
    }
  }, [currentIndex, emblaApi]);

  const scrollNext = useCallback(() => {
    if (currentIndex < totalScroll) {
      setCurrentIndex((prevValue) => prevValue + 1);
      if (emblaApi) emblaApi.scrollNext();
    }
  }, [currentIndex, emblaApi]);

  return (
    <div>
      <div className='flex gap-x-2'>
        {FilterButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => setSelectedRelevancy(button.filter)}
            className={`${selectedRelevancy === button.filter && 'text bg-gray-700 text-white'} mb-2 rounded-lg p-4 font-semibold hover:bg-gray-300  `}>
            {button.name}
          </button>
        ))}
      </div>
      <div className='relative mx-auto w-full'>
        <div ref={emblaRef} className='overflow-hidden'>
          <div className='-ml-4 flex'>
            {FilteredTrails.map((trail, index) => (
              <CarouselSlides key={index} {...trail} />
            ))}
          </div>
        </div>
        <div className='absolute top-1/2 z-50 flex w-full -translate-y-1/2 justify-between'>
          <button
            onClick={scrollPrev}
            disabled={currentIndex === 0}
            className='-ml-4 flex h-10 w-10 items-center rounded-full bg-gray-800 p-4 shadow-md disabled:opacity-0 sm:-ml-6 sm:h-12 sm:w-12'>
            <FaChevronLeft className='fill-white' />
          </button>
          <button
            onClick={scrollNext}
            disabled={currentIndex === totalScroll}
            className='-mr-4 flex h-10 w-10 items-center rounded-full bg-gray-800 p-4 shadow-md disabled:opacity-0 sm:-mr-6 sm:h-12 sm:w-12'>
            <FaChevronRight className='fill-white' />
          </button>
        </div>
      </div>
    </div>
  );
}

type filterType = 'popular' | 'new' | 'trending';

interface IFilterButtons {
  name: string;
  filter: filterType;
}

const FilterButtons: IFilterButtons[] = [
  {
    name: 'Popular',
    filter: 'popular',
  },
  {
    name: 'New',
    filter: 'new',
  },
  {
    name: 'Trending',
    filter: 'trending',
  },
];

export default Carousel;
