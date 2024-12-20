import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person, Sex } from '../../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  const { slug: currentSlug } = useParams();
  const noParent = '-';

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

  const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map((column, index) => (
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
              <tr
                data-cy="person"
                key={slug}
                className={cn({
                  'has-background-warning': slug === currentSlug,
                })}
              >
                <td>
                  <NavLink
                    to={`/people/${slug}`}
                    className={cn({
                      'has-text-danger': sex === Sex.Female,
                    })}
                  >
                    {name}
                  </NavLink>
                </td>

                <td>{sex === Sex.Male ? 'm' : 'f'}</td>
                <td>{born}</td>
                <td>{died}</td>

                <td>
                  {mother ? (
                    <NavLink
                      to={`/people/${mother.slug}`}
                      className="has-text-danger"
                    >
                      {mother.name}
                    </NavLink>
                  ) : (
                    motherName || noParent
                  )}
                </td>

                <td>
                  {father ? (
                    <NavLink to={`/people/${father.slug}`}>
                      {fatherName}
                    </NavLink>
                  ) : (
                    fatherName || noParent
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
