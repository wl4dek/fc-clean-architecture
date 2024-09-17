import { toXML } from "jstoxml";
import { OutputListProductDTO } from "../../../usecase/product/list/dto";

export default class ProductPresenter {
  static listXML(data: OutputListProductDTO): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        products: {
          product: data.products.map((product) => ({
            id: product.id,
            name: product.name,
            prrice: product.price,
          })),
        },
      },
      xmlOption
    );
  }
}
