import useItemInfo from "@/_hooks/product/use-item-info.hook";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

type ItemAttributesProps = {
  readonly productId: number;
};

const ItemAttributes = ({ productId }: ItemAttributesProps) => {
  const itemAttributesQuery = useItemInfo([productId]);

  const attributes = itemAttributesQuery.data?.[0] ?? null;

  return (
    <div className="flex flex-row gap-6 py-2 text-sm text-brand-gray-500">
      {attributes ? (
        <>
          <table className="h-fit flex-1">
            <tbody>
              <Attribute label="Brand" value={attributes.brand} />
              <Attribute
                label="Box Quantity"
                value={attributes.boxQuantity.toString()}
              />
              <Attribute
                label="Manufacturer&rsquo;s Part"
                value={attributes.mfrPartNo}
              />
              <Attribute label="Weight" value={attributes.weight.toString()} />
            </tbody>
          </table>

          <table className="flex-1">
            <tbody>
              {attributes.attributes?.length > 0 &&
                attributes.attributes.map((attribute) => (
                  <Attribute
                    key={attribute.attribute_name}
                    label={attribute.attribute_name}
                    value={attribute.attribute_value ?? ""}
                  />
                ))}
            </tbody>
          </table>
        </>
      ) : (
        itemAttributesQuery.isLoading && <Skeleton className="h-32 w-full" />
      )}
    </div>
  );
};

export default ItemAttributes;

const Attribute = ({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) => {
  if (!value) {
    return null;
  }

  return (
    <tr>
      <td className="font-bold">{label}:</td>
      <td className="pl-4" dangerouslySetInnerHTML={{ __html: value }} />
    </tr>
  );
};
