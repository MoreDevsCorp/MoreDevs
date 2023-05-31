interface Tag {
  skill: string;
}

export default function Tag({ skill }: Tag) {
  return (
    <span className="transition-all px-3 py-1 border border-black-900 text-black-900 rounded-xl cursor-pointer hover:bg-black-900 hover:text-white text-sm">
      {skill}
    </span>
  );
}
