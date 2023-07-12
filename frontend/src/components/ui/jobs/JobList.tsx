import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import offer from "../../../graphql/operations/offer";
import { selectUser } from "../../../state/userSlice/userSlice";
import {
  CreateOfferData,
  GetApplicantsVariables,
  GetOffersData,
} from "../../../types";
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

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const JobList = () => {
  const user = useSelector(selectUser);
  const params = new URLSearchParams(window.location.search);
  const companyId = params.get("companyId");

  const { data, refetch } = useQuery<GetOffersData>(offer.Queries.getOffers, {
    variables: {
      companyId: companyId || user.company.id,
    },
  });
  const [deleteOfferMutation, { error }] = useMutation<
    CreateOfferData,
    GetApplicantsVariables
  >(offer.Mutations.deleteOffer);

  console.log(error);

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
                <Link to={`/jobs/${offer.id}`}>
                  <Button size="text-xs">View</Button>
                </Link>
                <Button
                  size="text-xs"
                  onClick={() => {
                    deleteOfferMutation({
                      variables: {
                        offerId: offer.id,
                      },
                      onCompleted: () => {
                        toast.success("Job Offer Deleted!");
                        refetch();
                      },
                    });
                  }}
                >
                  Delete
                </Button>

                <Link to={`/job/applicants?offerId=${offer.id}`}>
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
