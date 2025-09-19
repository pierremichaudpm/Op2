import Expertise from '../Expertise';

export function WorldExpertise() {
  return (
    <section id="expertise" className="relative bg-white pb-10 overflow-visible">
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