import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  const { slug } = useParams();
  const noParent = '-';

  const findParent = (parentName: string | null) => {
    if (parentName) {
      return people.find(person => person.name === parentName);
    } else {
      return undefined;
    }
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
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}`}
                  className={cn({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.mother ? (
                  <NavLink
                    to={`/people/${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.mother.name}
                  </NavLink>
                ) : (
                  person.motherName || noParent
                )}
              </td>

              <td>
                {person.father ? (
                  <NavLink to={`/people/${person.father.slug}`}>
                    {person.fatherName}
                  </NavLink>
                ) : (
                  person.fatherName || noParent
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
