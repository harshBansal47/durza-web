import { clientApiUrl, clientHttp, clientRequestConfig } from "@/lib/client-http";

export type PersonalizationChoice = "accepted" | "declined";

export interface PersonalizedItem {
  title?: string;
}

export interface PersonalizedResponse {
  items?: PersonalizedItem[];
  reason?: string;
}

/** Browser-only calls that rely on the existing API's signed consent cookie. */
export const personalizationApi = {
  async postConsent(choice: PersonalizationChoice): Promise<boolean> {
    const response = await clientHttp.post(
      clientApiUrl("/analytics/consent"),
      { choice },
      clientRequestConfig(undefined, { credentials: "include" }),
    );
    return response.status >= 200 && response.status < 300;
  },

  deleteInterests(): Promise<void> {
    return clientHttp
      .delete(clientApiUrl("/personalization/interests"), clientRequestConfig(undefined, { credentials: "include" }))
      .then(() => undefined);
  },

  getPickedForYou(): Promise<PersonalizedResponse> {
    return clientHttp
      .get<PersonalizedResponse>(clientApiUrl("/personalization/picked-for-you"), {
        ...clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
      })
      .then(({ data }) => data);
  },

  exportInterests(): Promise<unknown> {
    return clientHttp
      .get<unknown>(clientApiUrl("/personalization/export"), {
        ...clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
      })
      .then(({ data }) => data);
  },
};
