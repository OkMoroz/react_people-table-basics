import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { COLUMNS } from '../../constants/personConstants';
import { PersonTableRow } from '../PersonTableRow/PersonTableRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  const { slug: currentSlug } = useParams();

  const findParent = (parentName: string | null): Person | null => {
    return people.find(person => person.name === parentName) || null;
  };

  const preparedPeople = people.map(person => {
    return {
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(
          ({
            slug,
            name,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
          }) => {
            return (
              <PersonTableRow
                key={slug}
                person={{
                  slug,
                  name,
                  sex,
                  born,
                  died,
                  mother,
                  father,
                  motherName,
                  fatherName,
                }}
                currentSlug={currentSlug || ''}
              />
            );
          },
        )}
      </tbody>
    </table>
  );
};
