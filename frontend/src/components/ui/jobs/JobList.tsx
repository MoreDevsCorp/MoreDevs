import { useQuery } from "@apollo/client";
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
import offer from "../../../graphql/operations/offer";
import { useSelector } from "react-redux";
import { selectUser } from "../../../state/userSlice/userSlice";
import { GetOffersData } from "../../../types";
import { Link } from "react-router-dom";

const JobList = () => {
  const user = useSelector(selectUser);
  const params = new URLSearchParams(window.location.search);
  const companyId = params.get("companyId");

  const { data } = useQuery<GetOffersData>(offer.Queries.getOffers, {
    variables: {
      companyId: companyId || user.company.id,
    },
  });

  console.log(data?.getOffers.offers);

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
        {data?.getOffers.offers.map((offer) => {
          return (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">{offer.title}</TableCell>
              <TableCell>{offer.taken ? "Taken" : "Not Taken"}</TableCell>
              <TableCell>{offer.location}</TableCell>
              <TableCell className="space-x-2">
                <Button size="text-xs">View</Button>
                <Button size="text-xs">Edit</Button>
                <Button size="text-xs">Delete</Button>

                <Link to={"/job/applicants"}>
                  <Button size="text-xs">Applicants</Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default JobList;
