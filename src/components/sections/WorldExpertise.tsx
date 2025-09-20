import Expertise from '../Expertise';

export function WorldExpertise() {
  return (
    <section id="expertise" className="relative bg-white pt-6 md:pt-8 lg:pt-11 pb-8 md:pb-12 lg:pb-16 overflow-visible">
      <div className="container-wrapper">
        <div className="relative w-full mx-auto overflow-visible max-w-[1728px]">
          <div className="relative w-full flex justify-start">
            <Expertise />
          </div>
        </div>
      </div>
    </section>
  );
}