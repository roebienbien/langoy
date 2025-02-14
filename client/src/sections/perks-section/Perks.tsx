import { PerksList } from './perks-list';
import PerksCard from './PerksCard';

export default function Perks() {
  return (
    <div id="about" className="my-20 flex flex-col items-center justify-center px-4 md:flex-row lg:px-20">
      <div className="flex h-full w-full flex-grow flex-col gap-y-4 text-center">
        <h2 className="text-xl font-bold md:text-2xl lg:text-4xl">Perks of Exploring with Us</h2>
        <div className="mx-auto flex flex-col gap-y-8 px-2 md:flex-row md:gap-x-4 lg:gap-y-10">
          {PerksList.map((perk, key) => (
            <PerksCard key={key} {...perk} />
          ))}
        </div>
      </div>
    </div>
  );
}

// <UnsplashImage photoId={"1584223719571-778f3f37aa56"} alt={"woman-smiling-mountain"} className="rounded-xl shadow-lg" />
