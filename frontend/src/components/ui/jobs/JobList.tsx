import Button from "../Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

const JobList = () => {
  return (
    <Table className="w-full">
      <TableCaption>Lists of jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">UX/UI Designer</TableCell>
          <TableCell>Taken</TableCell>
          <TableCell>Agadir</TableCell>
          <TableCell className="space-x-2">
            <Button size="text-xs">View</Button>
            <Button size="text-xs">Edit</Button>
            <Button size="text-xs">Delete</Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">Web Developer</TableCell>
          <TableCell>Taken</TableCell>
          <TableCell>Agadir</TableCell>
          <TableCell className="space-x-2">
            <Button size="text-xs">View</Button>
            <Button size="text-xs">Edit</Button>
            <Button size="text-xs">Delete</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default JobList;
