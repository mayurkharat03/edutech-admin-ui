import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import React, { useState } from "react";
import HorizontalTabs from "../../../components/HorizontalTabs";
import { ActiveStatus, KYCStatus } from "../../../config/constants";
import { useDistributers } from "../../../hooks/api/useDistributers";
import DashboardPage from "../../../layouts/Dashboard/DashboardPage";
import { parseActiveStatus } from "../../../utils/url/parseActiveStatus";
import { parseKycStatus } from "../../../utils/url/parseKycStatus";
import { parsePage, parsePageSize } from "../../../utils/url/parsePage";
import { parseSearchTerm } from "../../../utils/url/parseSearchTerm";
import DistributersFilterBar from "./DistributersFilterBar";
import DistributersTable from "./table/DistributersTable";
import { urlParamsToApi } from "./urlParamsToApi";
import { useUrlParams } from "./useUrlParams";

function DistributersListView() {
  const title = "Manage Distributers";

  const { urlParams, setUrlParams } = useUrlParams({
    parseUrlParams: (searchParams) => ({
      page: parsePage(searchParams),
      size: parsePageSize(searchParams),
      kyc: parseKycStatus(searchParams) || KYCStatus.COMPLETED,
      q: parseSearchTerm(searchParams) || "",
      status: parseActiveStatus(searchParams) || ActiveStatus.BOTH,
    }),
  });
  const [searchValue, setValue] = useState("");
  const distributersDetails = useDistributers({
    params: urlParamsToApi(urlParams),
  });

  const isLoading =
    distributersDetails.status === "idle" ||
    distributersDetails.status === "loading";

  const setUrlParam = (key, value) => {
    if (urlParams[key] === value) {
      return;
    }

    setUrlParams({
      page: 1,
      [key]: value,
    });
  };

  const setPage = (page, size) => {
    setUrlParams({
      page,
      size,
    });
  };

  // const setSort = (sort, dir) => {
    // setUrlParams({
    //   sort,
    //   dir,
    // });
  // };

  const onChange = (e) => {
    setValue(e.target.value);
    setUrlParam("kyc", KYCStatus.COMPLETED);
    if (e.target.value && e.target.value.length > 0) {
      setUrlParam("q", e.target.value);
    } else {
      setUrlParam("q", "");
    }
  };
  const onBlur = () => {};

  return (
    <DashboardPage documentTitle={title} pageTitle={title}>
      <DistributersFilterBar
        value={searchValue}
        onBlur={onBlur}
        onChange={onChange}
        urlParams={urlParams}
        setUrlParam={setUrlParam}
      />
      <Card>
        <HorizontalTabs
          items={[
            { value: KYCStatus.COMPLETED, label: "KYC Completed" },
            { value: KYCStatus.NOT_COMPLETED, label: "KYC Not Completed" },
            ,
          ]}
          value={urlParams.kyc}
          onChange={(event, value) => setUrlParam("kyc", value)}
        />
        <Divider />

        <DistributersTable
          count={distributersDetails.count}
          data={distributersDetails.data}
          isLoading={isLoading}
          page={urlParams.page}
          pageSize={urlParams.size}
          // sort={urlParams.sort}
          // sortDirection={urlParams.dir}
          onPageChange={setPage}
          // onSortChange={setSort}
          statusUrlParams={urlParams}
        />
      </Card>
    </DashboardPage>
  );
}

export default DistributersListView;
