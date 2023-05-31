import Button from "../../Button";
import prj from "../../../../assets/prj1.png";

export default function ProjectSlide() {
  return (
    <div className="flex flex-col space-y-5">
      <div>
        <img
          src={prj}
          alt="project-image"
          width={260}
          height={160}
          className="bg-contain"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-medium">Twitter Clone</h2>
        <h4 className="text-sm font-light">UX/UI design, 15.07.2022</h4>
        <Button outline size="text-sm">
          Visit The Project
        </Button>
      </div>
    </div>
  );
}
