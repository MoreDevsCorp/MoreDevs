interface Tag {
  skill: string;
}

export default function Tag({ skill }: Tag) {
  return (
    <span className="transition-all px-3 py-1 border border-black text-black rounded-xl cursor-pointer hover:bg-black hover:text-white text-sm">
      {skill}
    </span>
  );
}
