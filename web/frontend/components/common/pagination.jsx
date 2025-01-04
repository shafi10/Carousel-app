import { Pagination } from "@shopify/polaris";
import React from "react";
import { handleNext, handlePrevious } from "../../utils/paginationUtils.js";

export function PaginationButtons({ data, setSearchParams }) {
  return (
    <>
      {(data?.pageInfo?.hasPreviousPage || data?.pageInfo?.hasNextPage) && (
        <div className="center__align content__margin_top">
          <Pagination
            hasPrevious={data?.pageInfo?.hasPreviousPage}
            onPrevious={() => handlePrevious(data, setSearchParams)}
            hasNext={data?.pageInfo?.hasNextPage}
            onNext={() => handleNext(data, setSearchParams)}
          />
        </div>
      )}
    </>
  );
}
